const got = require('got');
const fuzz = require('fuzzball');
const { fail, success } = require('../lib/healthchecks');
const { logger } = require('../middleware/logger');

const {
  SPACEX_KEY,
  LAUNCH_LIBRARY_HEALTHCHECK,
  SPACEX_API: API,
} = process.env;
const LAUNCH_LIBRARY_API = 'https://ll.thespacedevs.com/2.1.0/launch/upcoming';

/**
 * Attach Launch Library v2 launch id's to upcoming launches
 * @return {Promise<void>}
 */
module.exports = async () => {
  try {
    const log = {
      name: 'launch-library',
      updated: false,
    };
    const upcomingLaunches = await got.post(`${API}/launches/query`, {
      json: {
        query: {
          upcoming: true,
        },
        options: {
          sort: {
            flight_number: 'asc',
          },
          limit: 1,
        },
      },
      resolveBodyOnly: true,
      responseType: 'json',
      throwHttpErrors: false,
    });
    if (upcomingLaunches.docs.length === 1) {
      const llLaunches = await got(LAUNCH_LIBRARY_API, {
        searchParams: {
          lsp__name: 'SpaceX',
          ordering: 'net',
          format: 'json',
        },
        responseType: 'json',
        throwHttpErrors: false,
      });
      if (llLaunches.statusCode === 200 && llLaunches.body.results.length) {
        const upcomingLaunch = upcomingLaunches.docs[0];
        const choices = llLaunches.body.results.map((result) => result.name.split(' | ')[1]);
        const results = fuzz.extract(upcomingLaunch.name, choices);
        if (results.length) {
          const launchLibraryId = llLaunches.body.results[results[0][2]].id;
          await got.patch(`${API}/launches/${upcomingLaunch.id}`, {
            json: {
              launch_library_id: launchLibraryId,
            },
            headers: {
              'spacex-key': SPACEX_KEY,
            },
          });
          [[, log.ratio]] = results;
          log.spacexdataName = upcomingLaunch.name;
          [[log.llName]] = results;
          log.launch_library_id = launchLibraryId;
          log.updated = true;
        }
      }
    }
    await success(LAUNCH_LIBRARY_HEALTHCHECK, log);
    logger.info(log);
  } catch (error) {
    const formatted = {
      name: 'launch-library',
      error: error.message,
      stack: error.stack,
    };
    await fail(LAUNCH_LIBRARY_HEALTHCHECK, formatted);
    logger.error(formatted);
  }
};
