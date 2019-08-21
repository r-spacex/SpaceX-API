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
const cheerio = require('cheerio');
const request = require('request-promise-native');
const fuzz = require('fuzzball');

let client;
let location;
let calculatedTimes;
let localTime;
let date;
let tbd;
let isTentative;

const sites = [];
const missionNames = [];
const promises = [];
const precision = [];
const flightNumbers = [];
const lastWikiUpdates = [];


// Launch Library settings

// lsp=121 means that SpaceX is the agency that launches
const launchLibraryURL = 'https://launchlibrary.net/1.4/launch?lsp=121&name=';

// How close (in days) the launch needs to be in order to be updated
// NOTE: Only applies to upcoming launches
const minimumProximity = 2;

// Threshold (in seconds) for getting data from Launch Library instead of the wiki manifest
// Represents how many hours without a Reddit update to wait before using data from Launch Library
const thresholdSeconds = 3 * 60 * 60; // E.g. 3 hours


// RegEx expressions for matching dates in the wiki manifest
// Allows for long months or short months ex. September vs Sep
// Allows for time with or without brackets ex [23:45] vs 23:45

// 2020 Nov 4 [14:10:56]
const second = /^[0-9]{4}\s([a-z]{3}|[a-z]{3,9})\s[0-9]{1,2}\s(\[[0-9]{2}:[0-9]{2}:[0-9]{2}\]|[0-9]{2}:[0-9]{2})$/i;

// 2020 Nov 4 [14:10]
const hour = /^[0-9]{4}\s([a-z]{3}|[a-z]{3,9})\s[0-9]{1,2}\s(\[[0-9]{2}:[0-9]{2}\]|[0-9]{2}:[0-9]{2})$/i;

// 2020 Nov 4
const day = /^[0-9]{4}\s([a-z]{3}|[a-z]{3,9})\s[0-9]{1,2}$/i;

// 2020 Nov
const month = /^[0-9]{4}\s([a-z]{3}|[a-z]{3,9})$/i;

// 2020
const year = /^[0-9]{4}$/i;

// 2020 TBD
const yearTbd = /^[0-9]{4}\sTBD$/i;

// 2020 Nov TBD
const monthTbd = /^[0-9]{4}\s([a-z]{3}|[a-z]{3,9})\sTBD$/i;

// 2020 Early/Mid/Late Nov
const monthVague = /^[0-9]{4}\s(early|mid|late)\s([a-z]{3}|[a-z]{3,9})$/i;

(async () => {
  try {
    client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true });
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
    lastWikiUpdates.push(launch.last_wiki_update);
  });

  // Grab subreddit wiki manifest
  const result = await request('https://old.reddit.com/r/spacex/wiki/launches/manifest');
  const $ = cheerio.load(result);

  // Gives us all manifest table rows in a single array
  const manifest = $('body > div.content > div > div > table:nth-child(8) > tbody').text();
  const manifestRow = manifest.split('\n').filter(v => v !== '');

  // Filter to collect manifest dates
  const manifestDates = manifestRow.filter((value, index) => index % 8 === 0);

  // Filter to collect payload names
  const manifestPayloads = manifestRow.filter((value, index) => (index + 3) % 8 === 0);

  // Filter to collect launchpad names
  const manifestLaunchpads = manifestRow.filter((value, index) => (index + 6) % 8 === 0);

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
        // Check and see if dates match a certain pattern depending on the length of the
        // date given. This sets the amount of precision needed for the date.
        let mdate = manifestDates[manifestIndex];
        // 2020 Q3
        if (mdate.includes('Q')) {
          mdate = mdate.replace('Q', '');
          precision[manifestIndex] = 'quarter';
          tbd = true;
          isTentative = true;
          // 2020 H1
        } else if (mdate.includes('H1')) {
          mdate = mdate.replace('H1', '1');
          precision[manifestIndex] = 'half';
          tbd = true;
          isTentative = true;
          // 2020 H2
        } else if (mdate.includes('H2')) {
          mdate = mdate.replace('H2', '3');
          precision[manifestIndex] = 'half';
          tbd = true;
          isTentative = true;
          // 2020 TBD
        } else if (yearTbd.test(mdate)) {
          precision[manifestIndex] = 'year';
          tbd = true;
          isTentative = true;
          // 2020
        } else if (year.test(mdate)) {
          precision[manifestIndex] = 'year';
          tbd = true;
          isTentative = true;
          // 2020 Nov TBD
        } else if (monthTbd.test(mdate)) {
          precision[manifestIndex] = 'month';
          tbd = true;
          isTentative = true;
          // 2020 Early/Mid/Late Nov
        } else if (monthVague.test(mdate)) {
          precision[manifestIndex] = 'month';
          tbd = true;
          isTentative = true;
          // 2020 Nov
        } else if (month.test(mdate)) {
          precision[manifestIndex] = 'month';
          tbd = true;
          isTentative = true;
          // 2020 Nov 4
        } else if (day.test(mdate)) {
          precision[manifestIndex] = 'day';
          tbd = false;
          isTentative = true;
          // 2020 Nov 4 [14:10]
        } else if (hour.test(mdate)) {
          precision[manifestIndex] = 'hour';
          tbd = false;
          isTentative = false;
        } else if (second.test(mdate)) {
          precision[manifestIndex] = 'hour';
          tbd = false;
          isTentative = false;
        } else {
          console.log('Date did not match any of the existing regular expressions');
          const send = gmail({
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
            to: process.env.NOTIFY_EMAIL,
            subject: 'Upcoming Launches',
            text: `Date does not match any formats: ${mdate}`,
          });
          await send();
          return;
        }

        // Store site_id for update query
        // Store manifest date for data cleaning
        location = sites[payloadIndex];
        date = manifestDates[manifestIndex];

        console.log(date);
        console.log(`${missionName} : ${manifestPayload}`);

        // Add flight numbers to array to check for duplicates
        flightNumbers.push(baseFlightNumber + manifestIndex);

        // Calculate launch site depending on wiki manifest
        let siteId = null;
        let siteName = null;
        let siteNameLong = null;
        console.log(manifestLaunchpads[manifestIndex]);

        if (manifestLaunchpads[manifestIndex] === 'SLC-40' || manifestLaunchpads[manifestIndex] === 'SLC-40 / LC-39A' || manifestLaunchpads[manifestIndex] === 'SLC-40 / BC') {
          siteId = 'ccafs_slc_40';
          siteName = 'CCAFS SLC 40';
          siteNameLong = 'Cape Canaveral Air Force Station Space Launch Complex 40';
        } else if (manifestLaunchpads[manifestIndex] === 'LC-39A' || manifestLaunchpads[manifestIndex] === 'LC-39A / BC' || manifestLaunchpads[manifestIndex] === 'LC-39A / SLC-40') {
          siteId = 'ksc_lc_39a';
          siteName = 'KSC LC 39A';
          siteNameLong = 'Kennedy Space Center Historic Launch Complex 39A';
        } else if (manifestLaunchpads[manifestIndex] === 'SLC-4E') {
          siteId = 'vafb_slc_4e';
          siteName = 'VAFB SLC 4E';
          siteNameLong = 'Vandenberg Air Force Base Space Launch Complex 4E';
        } else if (manifestLaunchpads[manifestIndex] === 'BC' || manifestLaunchpads[manifestIndex] === 'BC / LC-39A' || manifestLaunchpads[manifestIndex] === 'BC / SLC-40') {
          siteId = 'stls';
          siteName = 'STLS';
          siteNameLong = 'SpaceX South Texas Launch Site';
        }

        // Launch Library code
        let isDateFromWiki;
        let lastUpdate;
        let launchDate;
        let time;
        let zone;

        const parsedDate = `${date.replace(/(early|mid|late)/i, '').replace('[', '').replace(']', '')} +0000`;
        time = moment(parsedDate, ['YYYY MMM D HH:mm Z', 'YYYY MMM D Z', 'YYYY MMM Z', 'YYYY Q Z', 'YYYY Z']);
        zone = moment.tz(time, 'UTC');

        const daysToLaunch = time.diff(moment(), 'days');
        if (daysToLaunch <= minimumProximity) {
          let wikiDelay;
          let resultLL;
          // Get the launch from Launch Library
          // and check if it has updated more recently than the wiki.

          // First we look for the mission name in LL
          const query = launchLibraryURL + missionName.replace(/ /g, '+');
          try {
            resultLL = await request(query);
            resultLL = JSON.parse(resultLL);
            // November 4, 2019 00:00:00 UTC
            launchDate = moment(resultLL.launches[0].net.replace('UTC', 'Z'), 'MMMM D, YYYY hh:mm:ss Z');
            const changed = moment(resultLL.launches[0].changed, 'YYYY-MM-DD hh:mm:ss');
            if (zone.diff(launchDate) !== 0) {
              // If the date in the wiki and Launch Library aren't the same
              // we calculate the delay of the wiki in respect to Launch Library
              const lastWikiUpdate = moment(lastWikiUpdates[payloadIndex]);
              wikiDelay = changed.diff(lastWikiUpdate, 'seconds'); // if negative, the server is ahead
            } else {
              wikiDelay = 0;
            }
          } catch (e) {
            if (resultLL) {
              console.log(e);
            }
            // Mission not found in LL, so we use wiki's data
            wikiDelay = 0;
          }
          // Use the LL data if the delay of the wiki is bigger than 'thresholdSeconds'
          if (wikiDelay > thresholdSeconds) {
            isDateFromWiki = false;
          } else {
            isDateFromWiki = true;
          }
        } else {
          isDateFromWiki = true;
        }

        if (isDateFromWiki) {
          // If it was updated from the wiki, we save the current time in last_wiki_update
          lastUpdate = moment().toISOString();
        } else {
          // If it was updated from LL, we don't update last_wiki_update
          lastUpdate = lastWikiUpdates[payloadIndex];
        }

        // Strip brackets from time given, and tack on UTC time offset at the end for date parser
        if (isDateFromWiki) {
          time = moment(parsedDate, ['YYYY MMM D HH:mm Z', 'YYYY MMM D Z', 'YYYY MMM Z', 'YYYY Q Z', 'YYYY Z']);
        } else {
          // Use date from Launch Library instead
          time = launchDate;
        }


        // Feed stripped time into all possible date formats in the wiki currently
        zone = moment.tz(time, 'UTC');

        // Use launch site id's to properly set timezone for local time
        if (location === 'ccafs_slc_40' || location === 'ksc_lc_39a' || location === 'ccafs_lc_13') {
          localTime = time.tz('America/New_York').format();
        } else if (location === 'vafb_slc_4e' || location === 'vafb_slc_4w') {
          localTime = time.tz('America/Los_Angeles').format();
        } else {
          localTime = time.tz('America/Chicago').format();
        }

        // Build launch time objects to update
        calculatedTimes = {
          flight_number: (baseFlightNumber + manifestIndex),
          launch_year: (zone.year()).toString(),
          launch_date_unix: zone.unix(),
          launch_date_utc: zone.toISOString(),
          launch_date_local: localTime,
          last_wiki_update: lastUpdate,
          is_date_from_wiki: isDateFromWiki,
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
})().catch(e => console.error(e));
