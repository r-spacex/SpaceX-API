
// Prevent incorrect input
const lowerCase = require('lower-case');

/**
 * Builds Mongo sort object to set sorting direction
 * @param {Object} query Koa querystring object from ctx.request
 * @return {number} Positive or negative number to indicate sort direction
 */

module.exports = (q) => {
  let order;

  if (lowerCase(q.order) === 'asc') {
    order = 1;
  } else if (lowerCase(q.order) === 'desc') {
    order = -1;
  } else {
    order = 1;
  }

  return order;
};
