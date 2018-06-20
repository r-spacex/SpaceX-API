
/**
 * Returns number to limit documents in query
 * @param {Object} req The Koa context object to access querystrings
 * @return {number} Number of documents to limit
 */

module.exports = (req) => {
  let limit = null;

  if (req.query.limit) {
    limit = parseInt(req.query.limit, 10);
  } else {
    limit = 0;
  }

  return limit;
};
