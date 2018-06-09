
// Prevent incorrect input
const lowerCase = require('lower-case');

/**
 * Builds Mongo sort object to set document order
 * @param {Object} req The Koa context object to access querystrings
 * @return {Object} Mongo compatible sort object
 */

module.exports = (req) => {
  const query = {};

  if (lowerCase(req.query.order) === 'asc') {
    query.flight_number = 1;
  } else if (lowerCase(req.query.order) === 'desc') {
    query.flight_number = -1;
  } else {
    query.flight_number = 1;
  }

  return query;
};
