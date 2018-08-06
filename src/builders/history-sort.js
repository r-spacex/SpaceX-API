
// Prevent incorrect input
const lowerCase = require('lower-case');

/**
 * Builds Mongo sort object to set document order
 * @param {Object} query Koa querystring object from ctx.request
 * @return {Object} Mongo compatible sort object
 */

module.exports = (q) => {
  const query = {};

  if (lowerCase(q.order) === 'asc') {
    query.event_date_utc = 1;
  } else if (lowerCase(q.order) === 'desc') {
    query.event_date_utc = -1;
  } else {
    query.flight_number = 1;
  }

  return query;
};
