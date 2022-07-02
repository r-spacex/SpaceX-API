import got from 'got';
import moment from 'moment-timezone';
import { fail, success } from '../lib/healthchecks/index.js';
import { logger } from '../middleware/index.js';

const {
  SPACEX_KEY,
  LAUNCH_LIBRARY_HEALTHCHECK,
  SPACEX_API: API,
} = process.env;
const LAUNCH_LIBRARY_API = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming';

/**
 * Attach Launch Library v2 launch id's to upcoming launches
 * @return {Promise<void>}
 */
export default async () => {
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
        const dates = llLaunches.body.results.map((result) => ({
          llDate: result.net,
          llId: result.id,
        }));
        const diffs = dates.map((date) => ({
          diff: moment(upcomingLaunch.date_utc).diff(moment(date.llDate)),
          llId: date.llId,
        }));
        // Sort the date diffs by closeness to zero
        const close = diffs.reduce((a, b) => (Math.abs(b.diff - 0) < Math.abs(a.diff - 0) ? b : a));
        await got.patch(`${API}/launches/${upcomingLaunch.id}`, {
          json: {
            launch_library_id: close.llId,
          },
          headers: {
            'spacex-key': SPACEX_KEY,
          },
        });
        log.spacexdataName = upcomingLaunch.name;
        log.launch_library_id = close.llId;
        log.updated = true;
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
