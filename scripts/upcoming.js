#!/usr/bin/env node

/**
 * This script gathers dates and payload names from the subreddit launch manifest,
 * fuzzy checks them against existing upcoming payload id's and updates the date if a
 * change is made in the wiki. The proper time zone is calculated from the launch site
 * id of the launch. It also updates the flight number order based on the launch manifest order.
 *
 * Hopefully the format of the wiki does not change, but there's no real reason for it to change in the
 * forseeable future. If it does change, this script will have to be updated as necessary.
 */

const MongoClient = require('mongodb');
const moment = require('moment-timezone');
const cheerio = require('cheerio');
const request = require('request-promise-native');
const fuzz = require('fuzzball');

moment.suppressDeprecationWarnings = true;

let client;
let location;
let calculatedTimes;
let localTime;
let date;

const sites = [];
const payloads = [];
const promises = [];
const precision = [];
const flight_numbers = [];

// RegEx expressions for matching dates in the wiki manifest
// Allows for long months or short months ex. September vs Sep
// Allows for time with or without brackets ex [23:45] vs 23:45
const hour = /^[0-9]{4}\s([a-zA-Z]{3}|[a-zA-Z]{3,9})\s[0-9]{1,2}\s(\[[0-9]{2}:[0-9]{2}\]|[0-9]{2}:[0-9]{2})$/;
const day = /^[0-9]{4}\s([a-zA-Z]{3}|[a-zA-Z]{3,9})\s[0-9]{1,2}$/;
const month = /^[0-9]{4}\s([a-zA-Z]{3}|[a-zA-Z]{3,9})$/;
const year = /^[0-9]{4}$/;

(async () => {
  try {
    client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true });

    const db = client.db('spacex-api');
    const col = db.collection('launch');

    const launches = await col.find({ upcoming: true }).sort({ flight_number: 1 }).toArray();
    const base_flight_number = launches[0].flight_number;

    // Collect site names for time zone and payload name for fuzzy check
    launches.forEach(launch => {
      // Add temp fix for last Iridium NEXT launch because we need fuzzy
      // search to return 100% substring match, else we get SSO-A and SSO-B changing
      // because of a slight difference.
      // NOTE: Will be removed after launch
      if (launch.rocket.second_stage.payloads[0].payload_id === 'Iridium NEXT 8') {
        payloads.push('Iridium 8');
      } else {
        payloads.push(launch.rocket.second_stage.payloads[0].payload_id);
      }
      sites.push(launch.launch_site.site_id);
    });

    // Grab subreddit wiki manifest
    const result = await request('https://www.reddit.com/r/spacex/wiki/launches/manifest');
    const $ = cheerio.load(result);

    // Grab entire row, clean date, and convert to valid UTC moment date
    const manifest = $('body > div.content > div > div > table:nth-child(6) > tbody').text();
    const manifest_row = manifest.split('\n').filter(v => v !== '');

    // Filter to collect manaifest dates
    const manifest_dates = manifest_row.filter((value, index) => {
      return index % 8 === 0;
    });

    // Filter to collect payload names
    const manifest_payloads = manifest_row.filter((value, index) => {
      return (index + 3) % 8 === 0;
    });

    // Compare each payload against entire list of manifest payloads, and fuzzy match the
    // payload id against the manifest payload name. The partial match must be 100%, to avoid
    // conflicts like SSO-A and SSO-B, where a really close match would produce wrong results.
    payloads.forEach((payload, p_index) => {
      manifest_payloads.forEach((manifest_payload, m_index) => {
        if (fuzz.partial_ratio(payload, manifest_payload) === 100) {
          // Check and see if dates match a certain patten depending on the length of the
          // date given. This sets the amount of precision needed for the date.
          let mdate = manifest_dates[m_index];
          if (mdate.includes('Q')) {
            mdate = mdate.replace('Q', '');
            precision[m_index] = 'quarter';
          } else if (mdate.includes('H1')) {
            mdate = mdate.replace('H1', '1');
            precision[m_index] = 'half';
          } else if (mdate.includes('H2')) {
            mdate = mdate.replace('H2', '3');
            precision[m_index] = 'half';
          } else if (year.test(mdate)) {
            precision[m_index] = 'year';
          } else if (month.test(mdate)) {
            precision[m_index] = 'month';
          } else if (day.test(mdate)) {
            precision[m_index] = 'day';
          } else if (hour.test(mdate)) {
            precision[m_index] = 'hour';
          } else {
            console.log('Date did not match any of the existing regular expressions');
            process.exit(1);
          }

          // Store site_id for update query
          // Store manifest date for cleaning
          location = sites[p_index];
          date = manifest_dates[m_index];

          console.log(date);
          console.log(`${payload} : ${manifest_payload}`);

          // Strip brackets from time given, and tack on UTC time offset at the end for date parser
          const stripped_time = `${date.replace('[', '').replace(']', '')} +0000`;
          // Feed stripped time into all possible date formats in the wiki currently
          const time = moment(stripped_time, ['YYYY MMM D HH:mm Z', 'YYYY MMM D Z', 'YYYY MMM Z', 'YYYY Q Z', 'YYYY Z']);
          const zone = moment.tz(time, 'UTC');

          // Set timezone based on launch site id
          if (location === 'ccafs_slc_40' || location === 'ksc_lc_39a' || location === 'ccafs_lc_13') {
            localTime = time.tz('America/New_York').format();
          } else if (location === 'vafb_slc_4e' || location === 'vafb_slc_4w') {
            localTime = time.tz('America/Los_Angeles').format();
          } else {
            localTime = time.tz('America/Chicago').format();
          }

          // Add flight numbers to array to check for duplicates
          flight_numbers.push(base_flight_number + m_index);

          // Build launch time objects to update
          calculatedTimes = {
            flight_number: (base_flight_number + m_index),
            launch_date_unix: zone.unix(),
            launch_date_utc: zone.toISOString(),
            launch_date_local: localTime,
            is_tentative: true,
            tentative_max_precision: precision[m_index],
          };
          console.log(calculatedTimes);
          console.log('');

          // Another special case added for last Iridium launch
          // NOTE: Will be removed after launch
          if (payload === 'Iridium 8') {
            payload = 'Iridium NEXT 8';
          }

          // Add to array of promises to update all at once after the forEach iterations finish
          promises.push(col.updateOne({ 'rocket.second_stage.payloads.payload_id': payload }, { $set: calculatedTimes }));
        }
      });
    });

    // Check if duplicate flight numbers exist
    if ([...new Set(flight_numbers)].length < flight_numbers.length) {
      console.log('Duplicate flight numbers found');
      process.exit(1);
    }

    // Execute all our stored update promises
    const output = await Promise.all(promises);

    // Display if the document was found, and if it was modified or not
    output.forEach(doc => {
      console.log(`N: ${doc.result.n}`);
      console.log(`Modified: ${doc.result.nModified}`);
    });
  } catch (err) {
    console.log(err.stack);
  }

  if (client) {
    client.close();
  }
})();
