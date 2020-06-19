const got = require('got');
const { CookieJar } = require('tough-cookie');
const { logger } = require('../middleware/logger');

const SPACEX_API = 'https://api.spacexdata.com/v4';
const KEY = process.env.SPACEX_KEY;
const HEALTHCHECK = process.env.PAYLOADS_HEALTHCHECK;

/**
 * Update payload orbit params
 * @return {Promise<void>}
 */
module.exports = async () => {
  try {
    const payloads = await got.post(`${SPACEX_API}/payloads/query`, {
      json: {
        query: {},
        options: {
          pagination: false,
        },
      },
      resolveBodyOnly: true,
      responseType: 'json',
    });

    const cookieJar = new CookieJar();

    await got.post('https://www.space-track.org/ajaxauth/login', {
      form: {
        identity: process.env.SPACEX_TRACK_LOGIN,
        password: process.env.SPACEX_TRACK_PASSWORD,
      },
      cookieJar,
    });

    // eslint-disable-next-line no-secrets/no-secrets
    const data = await got('https://www.space-track.org/basicspacedata/query/class/tle_latest/ORDINAL/1/orderby/NORAD_CAT_ID/epoch/>now-30/format/json', {
      resolveBodyOnly: true,
      responseType: 'json',
      cookieJar,
    });

    const updates = payloads.docs.map(async (payload) => {
      const noradId = payload.norad_ids.shift() || null;
      const specificOrbit = data.find((sat) => parseInt(sat.NORAD_CAT_ID, 10) === noradId);
      if (specificOrbit) {
        await got.patch(`${SPACEX_API}/payloads/${payload.id}`, {
          json: {
            epoch: new Date(Date.parse(specificOrbit.EPOCH)).toISOString(),
            mean_motion: parseFloat(specificOrbit.MEAN_MOTION),
            raan: parseFloat(specificOrbit.RA_OF_ASC_NODE),
            arg_of_pericenter: parseFloat(specificOrbit.ARG_OF_PERICENTER),
            mean_anomaly: parseFloat(specificOrbit.MEAN_ANOMALY),
            semi_major_axis_km: parseFloat(specificOrbit.SEMIMAJOR_AXIS),
            eccentricity: parseFloat(specificOrbit.ECCENTRICITY),
            periapsis_km: parseFloat(specificOrbit.PERIGEE),
            apoapsis_km: parseFloat(specificOrbit.APOGEE),
            inclination_deg: parseFloat(specificOrbit.INCLINATION),
            period_min: parseFloat(specificOrbit.PERIOD),
          },
          headers: {
            'spacex-key': KEY,
          },
        });
      }
    });

    await Promise.all(updates);

    logger.info({
      orbitsUpdated: true,
    });

    if (HEALTHCHECK) {
      await got(HEALTHCHECK);
    }
  } catch (error) {
    console.log(error);
  }
};
