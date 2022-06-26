import got from 'got';
import { logger } from '../middleware/index.js';

const API = process.env.SPACEX_API;
const KEY = process.env.SPACEX_KEY;
const HEALTHCHECK = process.env.LAUNCHPADS_HEALTHCHECK;

/**
 * Update launchpad attempts/successes
 * @return {Promise<void>}
 */
export default async () => {
  try {
    const launchpads = await got.post(`${API}/launchpads/query`, {
      json: {
        options: {
          pagination: false,
        },
      },
      resolveBodyOnly: true,
      responseType: 'json',
    });

    const updates = launchpads.docs.map(async (launchpad) => {
      const [attempts, successes] = await Promise.all([
        got.post(`${API}/launches/query`, {
          json: {
            query: {
              launchpad: launchpad.id,
              upcoming: false,
            },
            options: {
              pagination: false,
            },
          },
          resolveBodyOnly: true,
          responseType: 'json',
        }),
        got.post(`${API}/launches/query`, {
          json: {
            query: {
              launchpad: launchpad.id,
              upcoming: false,
              success: true,
            },
            options: {
              pagination: false,
            },
          },
          resolveBodyOnly: true,
          responseType: 'json',
        }),
      ]);

      await got.patch(`${API}/launchpads/${launchpad.id}`, {
        json: {
          launch_attempts: attempts.totalDocs,
          launch_successes: successes.totalDocs,
        },
        headers: {
          'spacex-key': KEY,
        },
      });
    });

    await Promise.all(updates);

    logger.info('Launchpads updated');

    if (HEALTHCHECK) {
      await got(HEALTHCHECK);
    }
  } catch (error) {
    console.log(`Launchpads Error: ${error.message}`);
  }
};
