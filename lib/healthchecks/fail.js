/**
 * Imports
 */
const got = require('got');
const { HEALTHCHECK_PREFIX } = require('../constants');

/**
 * Send fail signal to healthcheck.io
 *
 * @param {String} [id] UUID of healthcheck
 * @param {String|Object} [msg] Message to pass to healthcheck
 * @returns {Boolean} True if successful
 */
module.exports = async (id = null, msg = {}) => {
  if (id) {
    const response = await got.post({
      prefixUrl: HEALTHCHECK_PREFIX,
      url: `${id}/fail`,
      json: msg,
    });
    if (response.statusCode === 200) {
      return true;
    }
  }
  return false;
};
