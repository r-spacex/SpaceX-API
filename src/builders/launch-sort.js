
// Prevent incorrect input
const lowerCase = require('lower-case');

/**
 * Builds Mongo sort object to set document order
 * @param {Object} request The Koa context object to access querystrings
 * @return {Object} Mongo compatible sort object
 */

module.exports.launchSort = (request) => {
  const query = {};

  if (lowerCase(request.query.order) === 'asc') {
    query.flight_number = 1;
  } else if (lowerCase(request.query.order) === 'desc') {
    query.flight_number = -1;
  } else {
    query.flight_number = 1;
  }

  return query;
};
