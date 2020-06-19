const got = require('got');
const { logger } = require('../middleware/logger');

const SPACEX_API = 'https://api.spacexdata.com/v4';
const KEY = process.env.SPACEX_KEY;
const HEALTHCHECK = process.env.LANDPADS_HEALTHCHECK;

/**
 * Update landpad attempts/successes
 * @return {Promise<void>}
 */
module.exports = async () => {
  try {
    const landpads = await got.post(`${SPACEX_API}/landpads/query`, {
      json: {
        options: {
          pagination: false,
        },
      },
      resolveBodyOnly: true,
      responseType: 'json',
    });

    const updates = landpads.docs.map(async (landpad) => {
      const attempts = await got.post(`${SPACEX_API}/launches/query`, {
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
      });

      const successes = await got.post(`${SPACEX_API}/launches/query`, {
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
      });

      await got.patch(`${SPACEX_API}/landpads/${landpad.id}`, {
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
    console.log(error);
  }
};
