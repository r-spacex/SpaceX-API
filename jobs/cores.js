import got from 'got';
import { load } from 'cheerio';
import { logger } from '../middleware/index.js';

const REDDIT_CORES = 'https://old.reddit.com/r/spacex/wiki/cores';
const API = process.env.SPACEX_API;
const KEY = process.env.SPACEX_KEY;
const HEALTHCHECK = process.env.CORES_HEALTHCHECK;

/**
 * Update cores
 * @return {Promise<void>}
 */
export default async () => {
  try {
    const cores = await got.post(`${API}/cores/query`, {
      json: {
        options: {
          pagination: false,
        },
      },
      resolveBodyOnly: true,
      responseType: 'json',
    });

    const result = await got(REDDIT_CORES);
    const $ = load(result.body);

    // Active Cores Table
    const scrapedActive = [];
    $('div.md:nth-child(2) > table:nth-child(13) > tbody:nth-child(2) > tr').each((index, element) => {
      if (index === 0) return true;
      const tds = $(element).find('td');
      const coreSerial = $(tds[0]).text() || null;
      const coreStatus = $(tds[5]).text().replace(/\[source\]/gi, '').trim() || null;
      if (!coreSerial && !coreStatus) return true;
      const tableRow = {
        coreSerial,
        coreStatus,
      };
      return scrapedActive.push(tableRow);
    });
    if (!scrapedActive.length) {
      throw new Error('No active cores found');
    }
    const activeUpdates = scrapedActive.map(async (row) => {
      const coreId = cores.docs.find((core) => core.serial === row.coreSerial);
      if (coreId?.id) {
        await got.patch(`${API}/cores/${coreId.id}`, {
          json: {
            last_update: row.coreStatus,
            status: 'active',
          },
          headers: {
            'spacex-key': KEY,
          },
        });
      }
    });
    await Promise.all(activeUpdates);
    logger.info('Active cores updated');
    const inactive = $('div.md:nth-child(2) > table:nth-child(16) > tbody:nth-child(2)').text();
    const inactiveRow = inactive.split('\n').filter((v) => v !== '');
    const inactiveCores = inactiveRow.filter((value, index) => index % 6 === 0);
    if (!inactiveCores.length) {
      throw new Error('No inactive cores found');
    }
    const inactiveStatus = inactiveRow.filter((value, index) => (index + 1) % 6 === 0).map((x) => x.replace(/\[source\]/gi, ''));
    const inactiveUpdates = inactiveCores.map(async (coreSerial, index) => {
      const coreId = cores.docs.find((core) => core.serial === coreSerial);
      if (coreId?.id) {
        await got.patch(`${API}/cores/${coreId.id}`, {
          json: {
            last_update: inactiveStatus[parseInt(index, 10)],
            status: 'inactive',
          },
          headers: {
            'spacex-key': KEY,
          },
        });
      }
    });
    await Promise.all(inactiveUpdates);
    logger.info('Inactive cores updated');

    const lost = $('div.md:nth-child(2) > table:nth-child(20) > tbody:nth-child(2)').text();
    const lostRow = lost.split('\n').filter((v) => v !== '');
    const lostCores = lostRow.filter((value, index) => index % 7 === 0);
    if (!lostCores.length) {
      throw new Error('No lost cores found');
    }
    const lostStatus = lostRow.filter((value, index) => (index + 1) % 7 === 0).map((x) => x.replace(/\[source\]/gi, ''));
    const lostUpdates = lostCores.map(async (coreSerial, index) => {
      const coreId = cores.docs.find((core) => core.serial === coreSerial);
      if (coreId?.id) {
        let status;
        if (lostStatus[parseInt(index, 10)].match(/expended/i)) {
          status = 'expended';
        } else {
          status = 'lost';
        }
        await got.patch(`${API}/cores/${coreId.id}`, {
          json: {
            last_update: lostStatus[parseInt(index, 10)],
            status,
          },
          headers: {
            'spacex-key': KEY,
          },
        });
      }
    });
    await Promise.all(lostUpdates);
    logger.info('Lost cores updated');

    const reuseUpdates = cores.docs.map(async (core) => {
      if (!core?.id) return;
      const [rtlsAttempts, rtlsLandings, asdsAttempts, asdsLandings] = await Promise.all([
        got.post(`${API}/launches/query`, {
          json: {
            query: {
              upcoming: false,
              cores: {
                $elemMatch: {
                  core: core.id,
                  landing_type: 'RTLS',
                  landing_attempt: true,
                },
              },
            },
            options: {
              pagination: false,
            },
          },
          resolveBodyOnly: true,
          responseType: 'json',
          throwHttpErrors: false,
        }),
        got.post(`${API}/launches/query`, {
          json: {
            query: {
              upcoming: false,
              cores: {
                $elemMatch: {
                  core: core.id,
                  landing_type: 'RTLS',
                  landing_attempt: true,
                  landing_success: true,
                },
              },
            },
            options: {
              pagination: false,
            },
          },
          resolveBodyOnly: true,
          responseType: 'json',
          throwHttpErrors: false,
        }),
        got.post(`${API}/launches/query`, {
          json: {
            query: {
              upcoming: false,
              cores: {
                $elemMatch: {
                  core: core.id,
                  landing_type: 'ASDS',
                  landing_attempt: true,
                  landing_success: true,
                },
              },
            },
            options: {
              pagination: false,
            },
          },
          resolveBodyOnly: true,
          responseType: 'json',
          throwHttpErrors: false,
        }),
        got.post(`${API}/launches/query`, {
          json: {
            query: {
              upcoming: false,
              cores: {
                $elemMatch: {
                  core: core.id,
                  landing_type: 'ASDS',
                  landing_attempt: true,
                  landing_success: true,
                },
              },
            },
            options: {
              pagination: false,
            },
          },
          resolveBodyOnly: true,
          responseType: 'json',
          throwHttpErrors: false,
        }),
      ]);
      await got.patch(`${API}/cores/${core.id}`, {
        json: {
          reuse_count: (core.launches.length > 0) ? core.launches.length - 1 : 0,
          rtls_attempts: rtlsAttempts.totalDocs,
          rtls_landings: rtlsLandings.totalDocs,
          asds_attempts: asdsAttempts.totalDocs,
          asds_landings: asdsLandings.totalDocs,
        },
        headers: {
          'spacex-key': KEY,
        },
      });
    });

    await Promise.all(reuseUpdates);
    logger.info('Core reuse updated');

    if (HEALTHCHECK) {
      await got(HEALTHCHECK);
    }
  } catch (error) {
    console.log(`Cores Error: ${error.message}`);
  }
};
