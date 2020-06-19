const got = require('got');
const { logger } = require('../middleware/logger');

const SPACEX_API = 'https://api.spacexdata.com/v4';
const KEY = process.env.SPACEX_KEY;
const HEALTHCHECK = process.env.LAUNCHPADS_HEALTHCHECK;

/**
 * Update launchpad attempts/successes
 * @return {Promise<void>}
 */
module.exports = async () => {
  try {
    const launchpads = await got.post(`${SPACEX_API}/launchpads/query`, {
      json: {
        options: {
          pagination: false,
        },
      },
      resolveBodyOnly: true,
      responseType: 'json',
    });

    const updates = launchpads.docs.map(async (launchpad) => {
      const attempts = await got.post(`${SPACEX_API}/launches/query`, {
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
      });

      const successes = await got.post(`${SPACEX_API}/launches/query`, {
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
      });

      await got.patch(`${SPACEX_API}/launchpads/${launchpad.id}`, {
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
    console.log(error);
  }
};
