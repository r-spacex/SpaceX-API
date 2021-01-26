const got = require('got');
const { logger } = require('../middleware/logger');

const API = process.env.SPACEX_API;
const KEY = process.env.SPACEX_KEY;
const HEALTHCHECK = process.env.FAIRINGS_HEALTHCHECK;

/**
 * Update fairing aggregate stats
 * @return {Promise<void>}
 */
module.exports = async () => {
  try {
    const fairings = await got.post(`${API}/fairings/query`, {
      json: {
        options: {
          pagination: false,
        },
      },
      resolveBodyOnly: true,
      responseType: 'json',
    });

    const reuseUpdates = fairings.docs.map(async (fairing) => {
      if (!fairing?.id) return;
      const [
        netLandingAttempts,
        netLanding,
        waterLandingAttempts,
        waterLanding,
      ] = await Promise.all([
        got.post(`${API}/launches/query`, {
          json: {
            query: {
              upcoming: false,
              fairings: {
                $elemMatch: {
                  fairing: fairing.id,
                  net_attempt: true,
                },
              },
            },
            options: {
              pagination: false,
            },
          },
          resolveBodyOnly: true,
          responseType: 'json',
          throwHttpErrors: true,
        }),
        got.post(`${API}/launches/query`, {
          json: {
            query: {
              upcoming: false,
              fairings: {
                $elemMatch: {
                  fairing: fairing.id,
                  net_attempt: true,
                  net_landing: true,
                },
              },
            },
            options: {
              pagination: false,
            },
          },
          resolveBodyOnly: true,
          responseType: 'json',
          throwHttpErrors: true,
        }),
        got.post(`${API}/launches/query`, {
          json: {
            query: {
              upcoming: false,
              fairings: {
                $elemMatch: {
                  fairing: fairing.id,
                  water_attempt: true,
                },
              },
            },
            options: {
              pagination: false,
            },
          },
          resolveBodyOnly: true,
          responseType: 'json',
          throwHttpErrors: true,
        }),
        got.post(`${API}/launches/query`, {
          json: {
            query: {
              upcoming: false,
              fairings: {
                $elemMatch: {
                  fairing: fairing.id,
                  water_attempt: true,
                  water_landing: true,
                },
              },
            },
            options: {
              pagination: false,
            },
          },
          resolveBodyOnly: true,
          responseType: 'json',
          throwHttpErrors: true,
        }),
      ]);
      await got.patch(`${API}/fairings/${fairing.id}`, {
        json: {
          reuse_count: (fairing.launches.length > 0) ? fairing.launches.length - 1 : 0,
          net_landing_attempts: netLandingAttempts.totalDocs,
          net_landing: netLanding.totalDocs,
          water_landing_attempts: waterLandingAttempts.totalDocs,
          water_landing: waterLanding.totalDocs,
        },
        headers: {
          'spacex-key': KEY,
        },
      });
    });

    await Promise.all(reuseUpdates);
    logger.info('Fairing reuse updated');

    if (HEALTHCHECK) {
      await got(HEALTHCHECK);
    }
  } catch (error) {
    console.log(`Fairings Error: ${error.message}`);
  }
};
