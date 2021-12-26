/**
 * Imports
 */
import got from 'got';
import { HEALTHCHECK_PREFIX } from '../constants.js';

/**
 * Send start signal to healthcheck.io
 *
 * @param {String} [id] UUID of healthcheck
 * @param {String|Object} [msg] Message to pass to healthcheck
 * @returns {Boolean} True if successful
 */
export default async (id = null, msg = {}) => {
  if (id) {
    const response = await got.post({
      prefixUrl: HEALTHCHECK_PREFIX,
      url: `${id}/start`,
      json: msg,
    });
    if (response.statusCode === 200) {
      return true;
    }
  }
  return false;
};
