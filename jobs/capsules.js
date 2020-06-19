const got = require('got');
const { logger } = require('../middleware/logger');

const SPACEX_API = 'https://api.spacexdata.com/v4';
const KEY = process.env.SPACEX_KEY;
const HEALTHCHECK = process.env.CAPSULES_HEALTHCHECK;

/**
 * Update capsule landings/reuse count
 * @return {Promise<void>}
 */
module.exports = async () => {
  try {
    const capsules = await got.post(`${SPACEX_API}/capsules/query`, {
      json: {
        options: {
          pagination: false,
        },
      },
      resolveBodyOnly: true,
      responseType: 'json',
    });

    const updates = capsules.docs.map(async (capsule) => {
      const waterLandings = await got.post(`${SPACEX_API}/payloads/query`, {
        json: {
          query: {
            'dragon.capsule': capsule.id,
            'dragon.water_landing': true,
          },
          options: {
            pagination: false,
          },
        },
        resolveBodyOnly: true,
        responseType: 'json',
      });

      const landLandings = await got.post(`${SPACEX_API}/payloads/query`, {
        json: {
          query: {
            'dragon.capsule': capsule.id,
            'dragon.land_landing': true,
          },
          options: {
            pagination: false,
          },
        },
        resolveBodyOnly: true,
        responseType: 'json',
      });

      await got.patch(`${SPACEX_API}/capsules/${capsule.id}`, {
        json: {
          reuse_count: capsule.launches.length,
          water_landings: waterLandings.totalDocs,
          land_landings: landLandings.totalDocs,
        },
        headers: {
          'spacex-key': KEY,
        },
      });
    });

    await Promise.all(updates);

    logger.info('Capsules updated');

    if (HEALTHCHECK) {
      await got(HEALTHCHECK);
    }
  } catch (error) {
    console.log(error);
  }
};
