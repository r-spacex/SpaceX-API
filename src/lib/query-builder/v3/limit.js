
/**
 * Returns number to limit documents in mongo query
 * @param {Object} query Koa querystring object from ctx.request
 * @return {number} Number of documents to limit
 */

module.exports = (q) => {
  let limit = null;

  if (q.limit) {
    limit = parseInt(q.limit, 10);
  } else {
    limit = 0;
  }

  return limit;
};
