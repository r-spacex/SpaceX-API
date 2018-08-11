
const dayjs = require('dayjs');

/**
 * Return date range object for mongo find query
 * @param {Object} query Koa querystring object from ctx.request
 * @return {Object} Mongo compatible date range query object
 */

module.exports = (q) => {
  let start;
  let end;
  // See if date is unix, if so, add miliseconds
  if (/^[0-9]*$/.test(q.start && (q.final || q.end))) {
    start = dayjs(q.start * 1000);
    end = dayjs(q.final * 1000 || q.end * 1000);
  } else {
    start = dayjs(q.start);
    end = dayjs(q.final || q.end);
  }

  return { $gte: start.toISOString(), $lte: end.toISOString() };
};
