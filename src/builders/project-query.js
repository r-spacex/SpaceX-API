
// Prevent incorrect input
const lowerCase = require('lower-case');

/**
 * Builds Mongo projection object to show/hide document id field
 * @param {Object} query The Koa querystring object to a
 * @return {Object} Mongo compatible projection object
 */

module.exports = (q) => {
  const result = {};

  if (lowerCase(q.id) !== 'true') {
    // Mongo _id field requires underscore dangle
    // eslint-disable-next-line no-underscore-dangle
    result._id = 0;
  }

  return result;
};
