import got from 'got';
import { logger } from '../middleware/index.js';

const API = process.env.SPACEX_API;
const KEY = process.env.SPACEX_KEY;
const HEALTHCHECK = process.env.LANDPADS_HEALTHCHECK;

/**
 * Update landpad attempts/successes
 * @return {Promise<void>}
 */
export default async () => {
  try {
    const landpads = await got.post(`${API}/landpads/query`, {
      json: {
        options: {
          pagination: false,
        },
      },
      resolveBodyOnly: true,
      responseType: 'json',
    });

    const updates = landpads.docs.map(async (landpad) => {
      const [attempts, successes] = await Promise.all([
        got.post(`${API}/launches/query`, {
          json: {
            query: {
              cores: {
                $elemMatch: {
                  landpad: landpad.id,
                  landing_attempt: true,
                },
              },
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
        got.post(`${API}/launches/query`, {
          json: {
            query: {
              cores: {
                $elemMatch: {
                  landpad: landpad.id,
                  landing_attempt: true,
                  landing_success: true,
                },
              },
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

      await got.patch(`${API}/landpads/${landpad.id}`, {
        json: {
          landing_attempts: attempts.totalDocs,
          landing_successes: successes.totalDocs,
        },
        headers: {
          'spacex-key': KEY,
        },
      });
    });

    await Promise.all(updates);

    logger.info('Landpads updated');

    if (HEALTHCHECK) {
      await got(HEALTHCHECK);
    }
  } catch (error) {
    console.log(`Landpads Error: ${error.message}`);
  }
};
