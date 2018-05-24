
// Prevent incorrect input
const lowerCase = require('lower-case');

/**
 * Builds Mongo sort object to set document order for SpaceX history endpoint
 * @param {Object} request The Koa context object to access querystrings
 * @return {Object} Mongo compatible sort object
 */

module.exports = (request) => {
  const query = {};

  if (lowerCase(request.query.order) === 'asc') {
    query.event_date_utc = 1;
  } else if (lowerCase(request.query.order) === 'desc') {
    query.event_date_utc = -1;
  } else {
    query.flight_number = 1;
  }

  return query;
};
