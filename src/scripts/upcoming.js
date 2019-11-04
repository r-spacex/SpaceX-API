#!/usr/bin/env node

/**
 * This script gathers dates and payload names from the subreddit launch manifest,
 * fuzzy checks them against existing upcoming mission names and updates the date if a
 * change is made in the wiki. The proper time zone is calculated from the launch site
 * id of the launch. It also corrects the flight number order based on the launch manifest order.
 *
 * Hopefully the format of the wiki does not change, but there's no real reason for it to
 * change in the forseeable future. If it does change, this script will have to be updated
 * as necessary.
 */

const MongoClient = require('mongodb');
const gmail = require('gmail-send');
const moment = require('moment-timezone');
const fuzz = require('fuzzball');

// Provider constants
const WIKI_PROVIDER = 'wiki';
const LL_PROVIDER = 'launch_library';

// Import providers
const wikiManifest = require('./providers/wiki-manifest');
const launchLibrary = require('./providers/launch-library');

let client;

const sites = [];
const missionNames = [];
const promises = [];
const precision = [];
const flightNumbers = [];

// Provider variables

// Stores the wiki revisions
let wikiRevisionHistory;
// Stores launch dates
const lastWikiLaunchDates = [];
// Stores the update times
const lastWikiDates = [];
// Stores the UUIDs of the revisions
const lastWikiRevisions = [];

// Store all the upcoming launches from Launch Library
// if at least one launch is within the threshold
let launchLibraryNextLaunches;

// Alternative providers settings

// How close (in days) the launch needs to be in order to be updated
// NOTE: Only applies to upcoming launches
const minimumProximity = 2;


// Threshold (in seconds) for getting data from Launch Library instead of the wiki manifest
// Represents how many hours without a Reddit update to wait before using data from Launch Library
const thresholdSeconds = 3 * 60 * 60; // E.g. 3 hours

// Calculates if we're within the time-sensitive threshold to check for updates
// from all providers (wiki, twitter, Launch Library and trusted users)
const withinSensitiveTreshold = (time) => {
  const daysToLaunch = time.diff(moment(), 'days');
  return (daysToLaunch <= minimumProximity && daysToLaunch > -2);
};

// Main script
(async () => {
  try {
    client = await MongoClient.connect(process.env.MONGO_URL || 'mongodb://localhost:27017', { useNewUrlParser: true });
  } catch (err) {
    console.log(err.stack);
  }

  const col = client.db('spacex-api').collection('launch');

  const launches = await col.find({ upcoming: true }).sort({ flight_number: 1 }).toArray();

  // We need the most recent launch number to keep all upcoming launches
  // in the correct order
  const pastLaunches = await col.find({ upcoming: false }).sort({ flight_number: -1 }).toArray();

  // Collect site names for time zone and payload name for fuzzy check
  launches.forEach((launch) => {
    missionNames.push(launch.mission_name);
    sites.push(launch.launch_site.site_id);
    // undefined unless within threshold
    lastWikiLaunchDates.push(launch.last_wiki_launch_date);
    lastWikiDates.push(launch.last_wiki_update);
    lastWikiRevisions.push(launch.last_wiki_revision);
  });

  const { manifestDates, manifestPayloads, manifestLaunchpads } = await wikiManifest.getData();

  // Set base flight number to automatically reorder launches on the manifest
  // If the most recent past launch is still on the wiki, don't offset the flight number
  let baseFlightNumber;
  if (fuzz.partial_ratio(pastLaunches[0].missionName, manifestPayloads[0]) === 100) {
    baseFlightNumber = pastLaunches[0].flight_number;
  } else {
    baseFlightNumber = pastLaunches[0].flight_number + 1;
  }

  // Compare each mission name against entire list of manifest payloads, and fuzzy match the
  // mission name against the manifest payload name. The partial match must be 100%, to avoid
  // conflicts like SSO-A and SSO-B, where a really close match would produce wrong results.
  for await (const [payloadIndex, missionName] of missionNames.entries()) {
    for await (const [manifestIndex, manifestPayload] of manifestPayloads.entries()) {
      if (fuzz.partial_ratio(missionName, manifestPayload) === 100) {
        // Special check for starlink / smallsat launches, because 'Starlink 2' and 'Starlink 23'
        // both pass the partial ratio check, so they are checked strictly below
        if (/starlink|smallsat/i.test(missionName) && fuzz.ratio(missionName, manifestPayload) !== 100) {
          // eslint-disable-next-line no-continue
          continue;
        }
        // Check and see if dates match a certain pattern depending on the length of the
        // date given. This sets the amount of precision needed for the date.
        const dateResult = await wikiManifest.checkDatePattern(manifestDates[manifestIndex].replace('-', ' ').replace('~', ''));
        const { tbd, isTentative } = dateResult;
        precision[manifestIndex] = dateResult.precision;

        // Store site_id for update query
        // Store manifest date for data cleaning
        const location = sites[payloadIndex];
        const date = manifestDates[manifestIndex];

        console.log(date);
        console.log(`${missionName} : ${manifestPayload}`);

        // Add flight numbers to array to check for duplicates
        flightNumbers.push(baseFlightNumber + manifestIndex);

        // Calculate launch site depending on wiki manifest
        const launchpad = manifestLaunchpads[manifestIndex];
        const { siteId, siteName, siteNameLong } = wikiManifest
          .calculateLaunchSite(launchpad);

        console.log(launchpad);

        // Decide which provider's launch date to use
        let provider;
        let isWithinThreshold = false;

        // Launch Library code
        let launchDateWiki;
        let launchDateLL;
        let updateTimeWiki;
        let updateTimeLL;
        let time;
        let lastRevision = null;

        const parsedDate = `${date.replace(/(-|\[|\]|~|early|mid|late)/gi, ' ')} +0000`;
        const timeWiki = moment(parsedDate, ['YYYY MMM D HH:mm Z', 'YYYY MMM D Z', 'YYYY MMM Z', 'YYYY Q Z', 'YYYY Z']);

        // Is the launch within the update critical threshold?
        if (withinSensitiveTreshold(timeWiki)) {
          isWithinThreshold = true;
          const possibleProviders = [WIKI_PROVIDER, LL_PROVIDER];
          if (!wikiRevisionHistory) {
            // Get UUIDs and dates for the revisions of the wiki manifest
            wikiRevisionHistory = await wikiManifest.getRevisions();
          }
          // Get the launch from Launch Library
          // and check if it has updated more recently than the wiki.

          // First we look for the mission name in LL
          // If the launches haven't been loaded,
          // we request the next 100 launches from Launch Library
          // in order to do fuzzy match locally
          if (!launchLibraryNextLaunches) {
            launchLibraryNextLaunches = await launchLibrary.nextLaunches();
            if (!launchLibraryNextLaunches) {
              possibleProviders.splice(possibleProviders.indexOf(LL_PROVIDER), 1);
            }
          }

          // getLastUpdate checks for against the last revision
          // returns the most recent launch date,
          // and the date and UUID of the last revision in which the date changed
          const lastWikiUpdate = wikiManifest.getLastUpdate(
            lastWikiLaunchDates[payloadIndex],
            lastWikiDates[payloadIndex],
            lastWikiRevisions[payloadIndex],
            timeWiki,
            wikiRevisionHistory.date[0],
            wikiRevisionHistory.UUID[0],
          );
          let lastLLUpdate;

          if (possibleProviders.length > 1) {
            lastLLUpdate = launchLibrary
              .getLastUpdate(launchLibraryNextLaunches, missionName);
            if (lastLLUpdate) {
              // Check which provider is ahead.
              // If positive, Launch Library is ahead and the wiki is delayed
              const difference = lastLLUpdate.updateTimeLL
                .diff(lastWikiUpdate.updateTimeWiki);
              if (difference > thresholdSeconds) {
                // Wiki is behind, use LL as provider
                provider = LL_PROVIDER;
              } else {
                // Wiki is ahead, use it as provider
                provider = WIKI_PROVIDER;
              }
            } else {
              provider = WIKI_PROVIDER;
            }
          } else {
            provider = WIKI_PROVIDER;
          }

          // Unwrap all providers
          ({ launchDateWiki, updateTimeWiki, lastRevision } = lastWikiUpdate);
          if (lastLLUpdate) {
            ({ launchDateLL, updateTimeLL } = lastLLUpdate);
          } else {
            // Couldn't connect or fuzzy match didn't pass
            // so we set the date to null
            launchDateLL = null;
            updateTimeLL = null;
          }
        } else {
          provider = WIKI_PROVIDER;
        }

        // Add providers stats if within the threshold
        let providerStats = {};
        if (isWithinThreshold) {
          let lastUpdate;
          // Using other provider, so the revision of the wiki doesn't change
          switch (provider) {
            case LL_PROVIDER:
              // If Launch Library is the provider
              time = launchDateLL;
              lastUpdate = updateTimeLL;
              break;
            default:
              time = launchDateWiki;
              lastUpdate = updateTimeWiki;
              break;
          }
          providerStats = {
            // Wiki provider
            last_wiki_launch_date: launchDateWiki.toISOString(),
            last_wiki_update: updateTimeWiki.toISOString(),
            last_wiki_revision: lastRevision,

            // LL provider
            last_ll_launch_date: (launchDateLL === null) ? null : launchDateLL.toISOString(),
            last_ll_update: (updateTimeLL === null) ? null : updateTimeLL.toISOString(),


            // Final information
            last_date_update: lastUpdate.toISOString(),
            launch_date_source: provider,
          };
        } else {
          // Not within threshold, update just from wiki
          time = timeWiki;
        }

        // Feed stripped time into all possible date formats in the wiki currently
        const zone = moment.tz(time, 'UTC');

        // Use launch site id's to properly set timezone for local time
        const localTime = wikiManifest.getLocalTime(time, location);

        const calculatedTimes = {
          flight_number: (baseFlightNumber + manifestIndex),
          launch_year: (zone.year()).toString(),
          launch_date_unix: zone.unix(),
          launch_date_utc: zone.toISOString(),
          launch_date_local: localTime,

          ...providerStats,

          is_tentative: isTentative,
          tentative_max_precision: precision[manifestIndex],
          tbd,
          'launch_site.site_id': siteId,
          'launch_site.site_name': siteName,
          'launch_site.site_name_long': siteNameLong,
        };
        console.log(calculatedTimes);
        console.log('');

        // Add to array of promises to update all at once after the forEach iterations finish
        promises.push(col.updateOne({ mission_name: missionName }, { $set: calculatedTimes }));
      }
    }
  }

  // Check if duplicate flight numbers exist
  if ([...new Set(flightNumbers)].length < flightNumbers.length) {
    console.log('Duplicate flight numbers found');
    const send = gmail({
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
      to: process.env.NOTIFY_EMAIL,
      subject: 'Upcoming Launches',
      text: 'New launches added to manifest',
    });
    await send();
    process.exit(1);
  }

  // Execute all our stored update promises
  const output = await Promise.all(promises);

  // Display if the document was found, and if it was modified or not
  output.forEach((doc, index) => {
    if (doc.result.nModified !== 0) {
      console.log(`${missionNames[index]} UPDATED`);
    } else {
      console.log(`${missionNames[index]}`);
    }
  });

  if (client) {
    client.close();
  }
})().catch((e) => console.error(e));
