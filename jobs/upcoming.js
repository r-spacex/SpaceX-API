/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */

const got = require('got');
const cheerio = require('cheerio');
const fuzz = require('fuzzball');
const moment = require('moment-timezone');
const { logger } = require('../middleware/logger');

const REDDIT_WIKI = 'https://old.reddit.com/r/spacex/wiki/launches/manifest';
const SPACEX_API = 'https://api.spacexdata.com/v4';
const KEY = process.env.SPACEX_KEY;
const HEALTHCHECK = process.env.UPCOMING_HEALTHCHECK;

/**
 * This script gathers dates and payload names from the subreddit launch wiki,
 * fuzzy checks them against existing upcoming mission names and updates the date if a
 * change is made in the wiki. The proper time zone is calculated from the launch site
 * id of the launch. It also corrects the flight number order based on the launch wiki order.
 * @return {Promise<void>}
 */
module.exports = async () => {
  try {
    const flightNumbers = [];
    const rawLaunches = await got.post(`${SPACEX_API}/launches/query`, {
      json: {
        options: {
          pagination: false,
          sort: {
            flight_number: 'asc',
          },
        },
      },
      resolveBodyOnly: true,
      responseType: 'json',
    });

    // Past launches needed to set new flight number order
    const upcoming = rawLaunches.docs.filter((doc) => doc.upcoming === true);
    const past = rawLaunches.docs.filter((doc) => doc.upcoming === false);

    // Grab subreddit wiki
    const rawWiki = await got(REDDIT_WIKI, {
      resolveBodyOnly: true,
    });
    const $ = cheerio.load(rawWiki);
    const wiki = $('body > div.content > div > div > table:nth-child(11) > tbody').text();

    if (!wiki) {
      throw new Error(`Broken wiki selector: ${wiki}`);
    }

    const wikiRow = wiki.split('\n').filter((v) => v !== '');

    const allWikiDates = wikiRow.filter((_, index) => index % 7 === 0);
    const wikiDates = allWikiDates.slice(0, 30).map((date) => date.replace(/~|\[[0-9]{1,3}\]/gi, '')
      .replace(/(~|early|mid|late|end|tbd|tba)/gi, ' ')
      .split('/')[0].trim());

    const allWikiPayloads = wikiRow.filter((_, index) => (index + 2) % 7 === 0);
    const wikiPayloads = allWikiPayloads.slice(0, 30).map((payload) => payload.replace(/\[[0-9]{1,3}\]/gi, ''));

    const allWikiLaunchpads = wikiRow.filter((_, index) => (index + 5) % 7 === 0);
    const wikiLaunchpads = allWikiLaunchpads.slice(0, 30).map((launchpad) => launchpad.replace(/\[[0-9]{1,3}\]/gi, ''));

    // Set base flight number to automatically reorder launches on the wiki
    // If the most recent past launch is still on the wiki, don't offset the flight number
    let baseFlightNumber;
    if (fuzz.partial_ratio(past[past.length - 1].name, wikiPayloads[0]) === 100) {
      baseFlightNumber = past[past.length - 1].flight_number;
    } else {
      baseFlightNumber = past[past.length - 1].flight_number + 1;
    }

    // Compare each mission name against entire list of wiki payloads, and fuzzy match the
    // mission name against the wiki payload name. The partial match must be 100%, to avoid
    // conflicts like SSO-A and SSO-B, where a really close match would produce wrong results.
    for await (const [, launch] of upcoming.entries()) {
      // Allow users to pause auto updates from wiki, while still preserving
      // flight reordering feature
      if (!launch.auto_update) {
        continue;
      }
      for await (const [wikiIndex, wikiPayload] of wikiPayloads.entries()) {
        if (fuzz.partial_ratio(launch.name, wikiPayload) === 100) {
          // Special check for starlink / smallsat launches, because Starlink 2 and Starlink 23
          // both pass the partial ratio check, so they are checked strictly below
          if (/starlink/i.test(launch.name) && fuzz.ratio(launch.name, wikiPayload) !== 100) {
            continue;
          }

          // Check and see if dates match a certain pattern depending on the length of the
          // date given. This sets the amount of precision needed for the date.
          // Allows for long months or short months ex: September vs Sep
          // Allows for time with or without brackets ex: [23:45] vs 23:45

          // Anything with TBD/TBA in date
          const tbdPattern = /^.*(tbd|tba).*$/i;

          // 2020
          const yearPattern = /^\s*[0-9]{4}\s*$/i;

          // 2020 Nov
          const monthPattern = /^\s*[0-9]{4}\s*([a-z]{3}|[a-z]{3,9})\s*$/i;

          // 2020 Nov 4
          const dayPattern = /^\s*[0-9]{4}\s*([a-z]{3}|[a-z]{3,9})\s*[0-9]{1,2}\s*$/i;

          // 2020 Nov [14:10]
          const vagueHourPattern = /^\s*[0-9]{4}\s*([a-z]{3}|[a-z]{3,9})\s*(\[?\s*[0-9]{2}:[0-9]{2}\s*\]?)\s*$/i;

          // 2020 Nov 4 [14:10]
          const hourPattern = /^\s*[0-9]{4}\s*([a-z]{3}|[a-z]{3,9})\s*[0-9]{1,2}\s*(\[?\s*[0-9]{2}:[0-9]{2}\s*\]?)\s*$/i;

          let precision;
          let wikiDate = wikiDates[parseInt(wikiIndex, 10)];

          // Check if date contains TBD
          const tbd = tbdPattern.test(wikiDate);

          // Remove extra stuff humans might add
          // NOTE: Add to this when people add unexpected things to dates in the wiki
          const cleanedwikiDate = wikiDate;

          // Set date precision
          if (cleanedwikiDate.includes('Q')) {
            // Quarter is first because moment.js does not make
            // a distinction between half vs quarter. Therefore
            // the first half starts at the beginning Q1, and the
            // second half starts at the beginning of Q3
            wikiDate = wikiDate.replace('Q', '');
            precision = 'quarter';
          } else if (cleanedwikiDate.includes('H1')) {
            wikiDate = wikiDate.replace('H1', '1');
            precision = 'half';
          } else if (cleanedwikiDate.includes('H2')) {
            wikiDate = wikiDate.replace('H2', '3');
            precision = 'half';
          } else if (yearPattern.test(cleanedwikiDate)) {
            precision = 'year';
          } else if (monthPattern.test(cleanedwikiDate)) {
            precision = 'month';
          } else if (dayPattern.test(cleanedwikiDate)) {
            precision = 'day';
          } else if (vagueHourPattern.test(cleanedwikiDate)) {
            precision = 'month';
          } else if (hourPattern.test(cleanedwikiDate)) {
            precision = 'hour';
          } else {
            throw new Error(`No date match: ${cleanedwikiDate}`);
          }

          // Add flight numbers to array to check for duplicates
          flightNumbers.push(baseFlightNumber + wikiIndex);

          // Wiki launchpad matchers
          const slc40Pattern = /^SLC-40.*$/i;
          const lc39aPattern = /^LC-39A.*$/i;
          const slc4ePattern = /^SLC-4E.*$/i;
          const bcPattern = /^BC.*$/i;

          // Calculate launch site depending on wiki manifest
          let launchpadId;
          let timezone;
          const launchpad = wikiLaunchpads[parseInt(wikiIndex, 10)];
          if (slc40Pattern.test(launchpad)) {
            const launchpads = await got.post(`${SPACEX_API}/launchpads/query`, {
              json: {
                query: {
                  name: 'CCAFS SLC 40',
                },
                options: {
                  limit: 1,
                },
              },
              resolveBodyOnly: true,
              responseType: 'json',
            });
            launchpadId = launchpads.docs[0].id;
            timezone = launchpads.docs[0].timezone;
          } else if (lc39aPattern.test(launchpad)) {
            const launchpads = await got.post(`${SPACEX_API}/launchpads/query`, {
              json: {
                query: {
                  name: 'KSC LC 39A',
                },
                options: {
                  limit: 1,
                },
              },
              resolveBodyOnly: true,
              responseType: 'json',
            });
            launchpadId = launchpads.docs[0].id;
            timezone = launchpads.docs[0].timezone;
          } else if (slc4ePattern.test(launchpad)) {
            const launchpads = await got.post(`${SPACEX_API}/launchpads/query`, {
              json: {
                query: {
                  name: 'VAFB SLC 4E',
                },
                options: {
                  limit: 1,
                },
              },
              resolveBodyOnly: true,
              responseType: 'json',
            });
            launchpadId = launchpads.docs[0].id;
            timezone = launchpads.docs[0].timezone;
          } else if (bcPattern.test(launchpad)) {
            const launchpads = await got.post(`${SPACEX_API}/launchpads/query`, {
              json: {
                query: {
                  name: 'STLS',
                },
                options: {
                  limit: 1,
                },
              },
              resolveBodyOnly: true,
              responseType: 'json',
            });
            launchpadId = launchpads.docs[0].id;
            timezone = launchpads.docs[0].timezone;
          } else {
            throw new Error(`No launchpad match: ${launchpad}`);
          }

          // Clean wiki date, set timezone
          const parsedDate = `${wikiDates[parseInt(wikiIndex, 10)].replace(/(-|\[|\]|~|early|mid|late|end)/gi, ' ').split('/')[0].trim()} +0000`;
          const time = moment(parsedDate, ['YYYY MMM D HH:mm Z', 'YYYY MMM D Z', 'YYYY MMM Z', 'YYYY Q Z', 'YYYY Z']);
          const zone = moment.tz(time, 'UTC');
          const localTime = time.tz(timezone).format();

          const rawUpdate = {
            flight_number: (baseFlightNumber + wikiIndex),
            date_unix: zone.unix(),
            date_utc: zone.toISOString(),
            date_local: localTime,
            date_precision: precision,
            launchpad: launchpadId,
            tbd,
          };

          logger.info({
            launch: launch.name,
            ...rawUpdate,
          });

          await got.patch(`${SPACEX_API}/launches/${launch.id}`, {
            json: {
              ...rawUpdate,
            },
            headers: {
              'spacex-key': KEY,
            },
          });
        }
      }
    }

    if (HEALTHCHECK) {
      await got(HEALTHCHECK);
    }
  } catch (error) {
    console.log(error);
  }
};
