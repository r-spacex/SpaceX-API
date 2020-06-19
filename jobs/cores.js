const got = require('got');
const cheerio = require('cheerio');
const { logger } = require('../middleware/logger');

const REDDIT_CORES = 'https://old.reddit.com/r/spacex/wiki/cores';
const SPACEX_API = 'https://api.spacexdata.com/v4';
const KEY = process.env.SPACEX_KEY;
const HEALTHCHECK = process.env.CORES_HEALTHCHECK;

/**
 * Update cores
 * @return {Promise<void>}
 */
module.exports = async () => {
  try {
    const cores = await got.post(`${SPACEX_API}/cores/query`, {
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

    const active = $('body > div.content > div > div > table:nth-child(14) > tbody').text();
    const activeRow = active.split('\n').filter((v) => v !== '');
    const activeCores = activeRow.filter((value, index) => index % 7 === 0);
    const activeStatus = activeRow.filter((value, index) => (index + 1) % 7 === 0);
    const activeUpdates = activeCores.map(async (coreSerial, index) => {
      const coreId = cores.docs.find((core) => core.serial === coreSerial);
      if (coreId && coreId.id) {
        await got.patch(`${SPACEX_API}/cores/${coreId.id}`, {
          json: {
            details: activeStatus[parseInt(index, 10)],
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

    const unknown = $('div.md:nth-child(2) > table:nth-child(17) > tbody:nth-child(2)').text();
    const unknownRow = unknown.split('\n').filter((v) => v !== '');
    const unknownCores = unknownRow.filter((value, index) => index % 6 === 0);
    const unknownStatus = unknownRow.filter((value, index) => (index + 1) % 6 === 0).map((x) => x.replace(/\[source\]/gi, ''));
    const unknownUpdates = unknownCores.map(async (coreSerial, index) => {
      const coreId = cores.docs.find((core) => core.serial === coreSerial);
      if (coreId && coreId.id) {
        await got.patch(`${SPACEX_API}/cores/${coreId.id}`, {
          json: {
            details: unknownStatus[parseInt(index, 10)],
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

    const inactive = $('div.md:nth-child(2) > table:nth-child(20) > tbody:nth-child(2)').text();
    const inactiveRow = inactive.split('\n').filter((v) => v !== '');
    const inactiveCores = inactiveRow.filter((value, index) => index % 6 === 0);
    const inactiveStatus = inactiveRow.filter((value, index) => (index + 1) % 6 === 0).map((x) => x.replace(/\[source\]/gi, ''));
    const inactiveUpdates = inactiveCores.map(async (coreSerial, index) => {
      const coreId = cores.docs.find((core) => core.serial === coreSerial);
      if (coreId && coreId.id) {
        await got.patch(`${SPACEX_API}/cores/${coreId.id}`, {
          json: {
            details: inactiveStatus[parseInt(index, 10)],
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

    const lost = $('div.md:nth-child(2) > table:nth-child(24) > tbody:nth-child(2)').text();
    const lostRow = lost.split('\n').filter((v) => v !== '');
    const lostCores = lostRow.filter((value, index) => index % 7 === 0);
    const lostStatus = lostRow.filter((value, index) => (index + 1) % 7 === 0).map((x) => x.replace(/\[source\]/gi, ''));
    const lostUpdates = lostCores.map(async (coreSerial, index) => {
      const coreId = cores.docs.find((core) => core.serial === coreSerial);
      if (coreId && coreId.id) {
        let status;
        if (lostStatus[parseInt(index, 10)].match(/expended/i)) {
          status = 'expended';
        } else {
          status = 'lost';
        }
        await got.patch(`${SPACEX_API}/cores/${coreId.id}`, {
          json: {
            details: lostStatus[parseInt(index, 10)],
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
      if (core && core.id) {
        const rtlsAttempts = await got.post(`${SPACEX_API}/launches/query`, {
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
        });

        const rtlsLandings = await got.post(`${SPACEX_API}/launches/query`, {
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
        });

        const asdsAttempts = await got.post(`${SPACEX_API}/launches/query`, {
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
        });

        const asdsLandings = await got.post(`${SPACEX_API}/launches/query`, {
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
        });

        await got.patch(`${SPACEX_API}/cores/${core.id}`, {
          json: {
            reuse_count: core.launches.length - 1,
            rtls_attempts: rtlsAttempts.totalDocs,
            rtls_landings: rtlsLandings.totalDocs,
            asds_attempts: asdsAttempts.totalDocs,
            asds_landings: asdsLandings.totalDocs,
          },
          headers: {
            'spacex-key': KEY,
          },
        });
      }
    });
    await Promise.all(reuseUpdates);
    logger.info('Core reuse updated');

    if (HEALTHCHECK) {
      await got(HEALTHCHECK);
    }
  } catch (error) {
    console.log(error);
  }
};
