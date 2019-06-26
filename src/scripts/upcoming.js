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


// RegEx expressions for matching dates in the wiki manifest
// Allows for long months or short months ex. September vs Sep
// Allows for time with or without brackets ex [23:45] vs 23:45

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
  });

  // Grab subreddit wiki manifest
  const result = await request('https://old.reddit.com/r/spacex/wiki/launches/manifest');
  const $ = cheerio.load(result);

  // Gives us all manifest table rows in a single array
  const manifest = $('body > div.content > div > div > table:nth-child(6) > tbody').text();
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
  missionNames.forEach((missionName, payloadIndex) => {
    manifestPayloads.forEach((manifestPayload, manifestIndex) => {
      if (fuzz.partial_ratio(missionName, manifestPayload) === 100) {
        // Check and see if dates match a certain patten depending on the length of the
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
        } else {
          console.log('Date did not match any of the existing regular expressions');
          return;
        }

        // Store site_id for update query
        // Store manifest date for data cleaning
        location = sites[payloadIndex];
        date = manifestDates[manifestIndex];

        console.log(date);
        console.log(`${missionName} : ${manifestPayload}`);

        // Strip brackets from time given, and tack on UTC time offset at the end for date parser
        const parsedDate = `${date.replace(/(early|mid|late)/i, '').replace('[', '').replace(']', '')} +0000`;
        const time = moment(parsedDate, ['YYYY MMM D HH:mm Z', 'YYYY MMM D Z', 'YYYY MMM Z', 'YYYY Q Z', 'YYYY Z']);

        // Feed stripped time into all possible date formats in the wiki currently
        const zone = moment.tz(time, 'UTC');

        // Use launch site id's to properly set timezone for local time
        if (location === 'ccafs_slc_40' || location === 'ksc_lc_39a' || location === 'ccafs_lc_13') {
          localTime = time.tz('America/New_York').format();
        } else if (location === 'vafb_slc_4e' || location === 'vafb_slc_4w') {
          localTime = time.tz('America/Los_Angeles').format();
        } else {
          localTime = time.tz('America/Chicago').format();
        }

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

        // Build launch time objects to update
        calculatedTimes = {
          flight_number: (baseFlightNumber + manifestIndex),
          launch_year: (zone.year()).toString(),
          launch_date_unix: zone.unix(),
          launch_date_utc: zone.toISOString(),
          launch_date_local: localTime,
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
    });
  });

  // Check if duplicate flight numbers exist
  if ([...new Set(flightNumbers)].length < flightNumbers.length) {
    console.log('Duplicate flight numbers found');
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
})();
