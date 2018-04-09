
// Prevent incorrect input
const lowerCase = require('lower-case');

/**
 * Builds Mongo projection object to show/hide document id field
 * @param {Object} request The Koa context object to access querystrings
 * @return {Object} Mongo compatible projection object
 */

module.exports = (request) => {
  const query = {};

  if (lowerCase(request.query.id) !== 'true') {
    // Mongo _id field requires underscore dangle
    // eslint-disable-next-line no-underscore-dangle
    query._id = 0;
  }

  return query;
};
