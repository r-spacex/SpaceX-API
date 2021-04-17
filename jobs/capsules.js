const got = require('got');
const cheerio = require('cheerio');
const { logger } = require('../middleware/logger');

const API = process.env.SPACEX_API;
const KEY = process.env.SPACEX_KEY;
const HEALTHCHECK = process.env.CAPSULES_HEALTHCHECK;
const REDDIT_CAPSULES = 'https://old.reddit.com/r/spacex/wiki/capsules';

/**
 * Update capsule landings/reuse count
 * @return {Promise<void>}
 */
module.exports = async () => {
  try {
    const capsules = await got.post(`${API}/capsules/query`, {
      json: {
        options: {
          pagination: false,
        },
      },
      resolveBodyOnly: true,
      responseType: 'json',
    });

    const result = await got(REDDIT_CAPSULES);
    const $ = cheerio.load(result.body);

    const v1Capsules = $('body > div.content > div > div > table:nth-child(8) > tbody').text();
    const v2Capsules = $('body > div.content > div > div > table:nth-child(10) > tbody').text();
    const caps = v1Capsules.concat(v2Capsules);
    const capsuleRow = caps.split('\n').filter((v) => v !== '');
    const capsuleIds = capsuleRow.filter((value, index) => index % 7 === 0);
    if (!capsuleIds.length) {
      throw new Error('No capsules found');
    }
    const capsuleStatus = capsuleRow.filter((value, index) => (index + 1) % 7 === 0).map((x) => x.replace(/\[source\]/gi, ''));

    const updates = capsules.docs.map(async (capsule) => {
      const waterLandings = await got.post(`${API}/payloads/query`, {
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

      const landLandings = await got.post(`${API}/payloads/query`, {
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

      const index = capsuleIds.findIndex((id) => id === capsule.serial);
      await got.patch(`${API}/capsules/${capsule.id}`, {
        json: {
          reuse_count: capsule.launches.length,
          water_landings: waterLandings.totalDocs,
          land_landings: landLandings.totalDocs,
          last_update: capsuleStatus[parseInt(index, 10)],
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
    console.log(`Capsules Error: ${error.message}`);
  }
};
