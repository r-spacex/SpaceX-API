
// Prevent incorrect input
const lowerCase = require('lower-case');

/**
 * Builds Mongo projection object to show/hide document id field
 * @param {Object} query Koa querystring object from ctx.request
 * @return {Object} Mongo compatible projection object
 */

module.exports = (q) => {
  const query = {};

  if (lowerCase(q.id) !== 'true') {
    // Mongo _id field requires underscore dangle
    // eslint-disable-next-line no-underscore-dangle
    query._id = 0;
  }

  return query;
};
