const got = require('got');
const moment = require('moment-timezone');
const shell = require('shelljs');
const { logger } = require('../middleware/logger');

const SPACEX_API = 'https://api.spacexdata.com/v4';
const KEY = process.env.SPACEX_KEY;
const HEALTHCHECK = process.env.ROADSTER_HEALTHCHECK;

// Using date range so Horizons doesn't give us the default 10 day data
const today = moment().format('YYYY-MMM-DD HH:mm:ss');
const tomorrow = moment().add(1, 'day').format('YYYY-MMM-DD HH:mm:ss');

const ORBIT_URL = `https://ssd.jpl.nasa.gov/horizons_batch.cgi?batch=1&
COMMAND= '-143205'&
CENTER= '500@10'&
MAKE_EPHEM= 'YES'&
TABLE_TYPE= 'ELEMENTS'&
START_TIME= '${today}'&
STOP_TIME= '${tomorrow}'&
STEP_SIZE= '1 d'&
OUT_UNITS= 'AU-D'&
REF_PLANE= 'ECLIPTIC'&
REF_SYSTEM= 'J2000'&
TP_TYPE= 'ABSOLUTE'&
ELEM_LABELS= 'YES'&
CSV_FORMAT= 'NO'&
OBJ_DATA= 'YES'`;

const EARTH_DIST_URL = `https://ssd.jpl.nasa.gov/horizons_batch.cgi?batch=1&
COMMAND= '-143205'&
CENTER= '500@399'&
MAKE_EPHEM= 'YES'&
TABLE_TYPE= 'OBSERVER'&
START_TIME= '${today}'&
STOP_TIME= '${tomorrow}'&
STEP_SIZE= '1 d'&
CAL_FORMAT= 'CAL'&
TIME_DIGITS= 'MINUTES'&
ANG_FORMAT= 'HMS'&
OUT_UNITS= 'KM-S'&
RANGE_UNITS= 'AU'&
APPARENT= 'AIRLESS'&
SUPPRESS_RANGE_RATE= 'NO'&
SKIP_DAYLT= 'NO'&
EXTRA_PREC= 'NO'&
R_T_S_ONLY= 'NO'&
REF_SYSTEM= 'J2000'&
CSV_FORMAT= 'NO'&
OBJ_DATA= 'YES'&
QUANTITIES= '19,20'`;

const MARS_DIST_URL = `https://ssd.jpl.nasa.gov/horizons_batch.cgi?batch=1&
COMMAND= '-143205'&
CENTER= '500@499'&
MAKE_EPHEM= 'YES'&
TABLE_TYPE= 'OBSERVER'&
START_TIME= '${today}'&
STOP_TIME= '${tomorrow}'&
STEP_SIZE= '1 d'&
CAL_FORMAT= 'CAL'&
TIME_DIGITS= 'MINUTES'&
ANG_FORMAT= 'HMS'&
OUT_UNITS= 'KM-S'&
RANGE_UNITS= 'AU'&
APPARENT= 'AIRLESS'&
SUPPRESS_RANGE_RATE= 'NO'&
SKIP_DAYLT= 'NO'&
EXTRA_PREC= 'NO'&
R_T_S_ONLY= 'NO'&
REF_SYSTEM= 'J2000'&
CSV_FORMAT= 'NO'&
OBJ_DATA= 'YES'&
QUANTITIES= '19,20,22'`;

shell.config.silent = true;

/**
 * This script gathers tesla roadster orbital data from JPL Horizons,
 * parses the output with various regular expressions, and updates
 * the data accordingly.
 * @return {Promise<void>}
 */
module.exports = async () => {
  try {
    const params = {
      resolveBodyOnly: true,
    };

    const [orbitParams, earthDist, marsDist] = await Promise.all([
      got(ORBIT_URL, params),
      got(EARTH_DIST_URL, params),
      got(MARS_DIST_URL, params),
    ]);

    /**
     * All JPL Horizon parsing regexes from https://github.com/lnxbil/stellarium-comet-jpl
     */

    // Reading the SOE-Part into 'soe' for further processing
    const soeReg = /\$\$SOE([\s\S]*)\$\$EOE/m;
    soeReg.exec(orbitParams);
    const orbitSoe = RegExp.$1;

    // Reading Epoch - valid for CE dates.
    const epochReg = /^[ ]*([0-9.]+)[ ]*=[ ]*A[.]D[.][ ]*/m;
    epochReg.exec(orbitSoe);
    const epoch = parseFloat(RegExp.$1);

    // Reading Semi-major axis (A)
    const smaReg = /A=[ ]*([0-9.E+-]+)/m;
    smaReg.exec(orbitSoe);
    const sma = parseFloat(RegExp.$1);

    // Reading Eccentricity (EC)
    const ecReg = /EC=[ ]*([0-9.E+-]+)/m;
    ecReg.exec(orbitSoe);
    const ecc = parseFloat(RegExp.$1);

    // Reading Periapsis distance (QR)
    const qrReg = /QR=[ ]*([0-9.E+-]+)/m;
    qrReg.exec(orbitSoe);
    const pqr = parseFloat(RegExp.$1);

    // Reading Apoapsis distance (QR)
    const adReg = /AD=[ ]*([0-9.E+-]+)/m;
    adReg.exec(orbitSoe);
    const aad = parseFloat(RegExp.$1);

    // Reading Longitude of Ascending Node
    const omReg = /OM=[ ]*([0-9.E+-]+)/m;
    omReg.exec(orbitSoe);
    const lon = parseFloat(RegExp.$1);

    // Reading Argument of periapsis (W)
    const wReg = /W\s=[ ]*([0-9.E+-]+)/m;
    wReg.exec(orbitSoe);
    const aop = parseFloat(RegExp.$1);

    // Reading Inclination w.r.t xy-plane
    const inReg = /IN=[ ]*([0-9.E+-]+)/m;
    inReg.exec(orbitSoe);
    const inc = parseFloat(RegExp.$1);

    // Reading orbital period
    const periodReg = /PR=[ ]*([0-9.E+-]+)/m;
    periodReg.exec(orbitSoe);
    const period = parseFloat(RegExp.$1);

    // Read SOE of earth distance + calculate distance in miles and kilometers
    soeReg.exec(earthDist);
    const earthSoe = RegExp.$1;
    const strippedEarth = earthSoe.replace(/(\r\n\t|\n|\r\t)/gm, '');
    const earthResult = shell.exec(`echo ${strippedEarth}`).exec('awk \'NR==1{print $5}\'');
    const earthDistanceKm = (parseFloat(earthResult.stdout.trim()) * 149598073);
    const earthDistanceMi = earthDistanceKm * 0.621371;

    // Read SOE of mars distance + calculate distance in miles and kilometers
    soeReg.exec(marsDist);
    const marsSoe = RegExp.$1;
    const strippedMars = marsSoe.replace(/(\r\n\t|\n|\r\t)/gm, '');
    const marsResult = shell.exec(`echo ${strippedMars}`).exec('awk \'NR==1{print $5}\'');
    const marsDistanceKm = (parseFloat(marsResult.stdout.trim()) * 149598073);
    const marsDistanceMi = marsDistanceKm * 0.621371;

    // Read SOE of orbital speed in KM/s + calculate kph and mph
    const speedResult = shell.exec(`echo ${strippedMars}`).exec('awk \'NR==1{print $7}\'');
    const orbitalSpeedKph = (parseFloat(speedResult.stdout.trim()) * 60.0 * 60.0);
    const orbitalSpeedMph = orbitalSpeedKph * 0.621371;

    const roadster = await got(`${SPACEX_API}/roadster`, {
      resolveBodyOnly: true,
      responseType: 'json',
    });

    await got.patch(`${SPACEX_API}/roadster/${roadster.id}`, {
      json: {
        epoch_jd: epoch,
        apoapsis_au: aad,
        periapsis_au: pqr,
        semi_major_axis_au: sma,
        eccentricity: ecc,
        inclination: inc,
        longitude: lon,
        periapsis_arg: aop,
        period_days: period,
        speed_kph: orbitalSpeedKph,
        speed_mph: orbitalSpeedMph,
        earth_distance_km: earthDistanceKm,
        earth_distance_mi: earthDistanceMi,
        mars_distance_km: marsDistanceKm,
        mars_distance_mi: marsDistanceMi,
      },
      headers: {
        'spacex-key': KEY,
      },
    });

    logger.info('Roadster updated');

    if (HEALTHCHECK) {
      await got(HEALTHCHECK);
    }
  } catch (error) {
    console.log(error);
  }
};
