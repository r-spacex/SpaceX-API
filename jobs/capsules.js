import got from 'got';
import { load } from 'cheerio';
import { logger } from '../middleware/index.js';

const API = process.env.SPACEX_API;
const KEY = process.env.SPACEX_KEY;
const HEALTHCHECK = process.env.CAPSULES_HEALTHCHECK;
const REDDIT_CAPSULES = 'https://old.reddit.com/r/spacex/wiki/capsules';

/**
 * Update capsule landings/reuse count
 * @return {Promise<void>}
 */
export default async () => {
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
    const $ = load(result.body);

    const v1Capsules = $('div.md:nth-child(2) > table:nth-child(8) > tbody:nth-child(2)').text();
    const v1CapsuleRow = v1Capsules.split('\n').filter((v) => v !== '');
    const v1CapsuleIds = v1CapsuleRow.filter((value, index) => index % 7 === 0);
    if (!v1CapsuleIds.length) {
      throw new Error('No v1 capsules found');
    }
    const v1CapsuleStatus = v1CapsuleRow.filter((value, index) => (index + 1) % 7 === 0).map((x) => x.replace(/\[source\]/gi, ''));

    const v2Capsules = $('div.md:nth-child(2) > table:nth-child(10) > tbody:nth-child(2)').text();
    const v2CapsuleRow = v2Capsules.split('\n').filter((v) => v !== '');
    const v2CapsuleIds = v2CapsuleRow.filter((value, index) => index % 8 === 0).map((x) => x.split(',')[0]);
    if (!v2CapsuleIds.length) {
      throw new Error('No v2 capsules found');
    }
    const v2CapsuleStatus = v2CapsuleRow.filter((value, index) => (index + 1) % 8 === 0).map((x) => x.replace(/\[source\]/gi, ''));

    const capsuleIds = [...v1CapsuleIds, ...v2CapsuleIds];
    const capsuleStatus = [...v1CapsuleStatus, ...v2CapsuleStatus];

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
          reuse_count: (capsule.launches.length > 0) ? capsule.launches.length - 1 : 0,
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
