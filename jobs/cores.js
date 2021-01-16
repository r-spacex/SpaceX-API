const got = require('got');
const cheerio = require('cheerio');
const { logger } = require('../middleware/logger');

const REDDIT_CORES = 'https://old.reddit.com/r/spacex/wiki/cores';
const API = process.env.SPACEX_API;
const KEY = process.env.SPACEX_KEY;
const HEALTHCHECK = process.env.CORES_HEALTHCHECK;

/**
 * Update cores
 * @return {Promise<void>}
 */
module.exports = async () => {
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
    const $ = cheerio.load(result.body);

    const active = $('body > div.content > div > div > table:nth-child(15) > tbody').text();
    const activeRow = active.split('\n').filter((v) => v !== '');
    const activeCores = activeRow.filter((value, index) => index % 7 === 0);
    if (!activeCores.length) {
      throw new Error('No active cores found');
    }
    const activeStatus = activeRow.filter((value, index) => (index + 1) % 7 === 0);
    const activeUpdates = activeCores.map(async (coreSerial, index) => {
      const coreId = cores.docs.find((core) => core.serial === coreSerial);
      if (coreId && coreId.id) {
        await got.patch(`${API}/cores/${coreId.id}`, {
          json: {
            last_update: activeStatus[parseInt(index, 10)],
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

    const unknown = $('body > div.content > div > div > table:nth-child(18) > tbody').text();
    const unknownRow = unknown.split('\n').filter((v) => v !== '');
    const unknownCores = unknownRow.filter((value, index) => index % 6 === 0);
    if (!unknownCores.length) {
      throw new Error('No unknown cores found');
    }
    const unknownStatus = unknownRow.filter((value, index) => (index + 1) % 6 === 0).map((x) => x.replace(/\[source\]/gi, ''));
    const unknownUpdates = unknownCores.map(async (coreSerial, index) => {
      const coreId = cores.docs.find((core) => core.serial === coreSerial);
      if (coreId && coreId.id) {
        await got.patch(`${API}/cores/${coreId.id}`, {
          json: {
            last_update: unknownStatus[parseInt(index, 10)],
            status: 'unknown',
          },
          headers: {
            'spacex-key': KEY,
          },
        });
      }
    });
    await Promise.all(unknownUpdates);
    logger.info('Unknown cores updated');

    const inactive = $('body > div.content > div > div > table:nth-child(21) > tbody').text();
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

    const lost = $('body > div.content > div > div > table:nth-child(25) > tbody').text();
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
