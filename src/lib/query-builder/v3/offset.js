/**
 * Returns number to offset documents in mongo query
 * @param {Object} query Koa querystring object from ctx.request
 * @return {number} Number of documents to skip
 */

module.exports = (q) => {
  let offset = null;

  if (q.offset) {
    offset = parseInt(q.offset, 10);
  } else {
    offset = 0;
  }

  return offset;
};
