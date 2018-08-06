
// Prevent incorrect input
const lowerCase = require('lower-case');

/**
 * Builds Mongo sort object to set document order
 * @param {Object} query Koa querystring object from ctx.request
 * @return {Object} Mongo compatible sort object
 */

module.exports = (q) => {
  const result = {};

  if (lowerCase(q.order) === 'asc') {
    result.flight_number = 1;
  } else if (lowerCase(q.order) === 'desc') {
    result.flight_number = -1;
  } else {
    result.flight_number = 1;
  }

  return result;
};
