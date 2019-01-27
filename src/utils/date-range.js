
const moment = require('moment');

/**
 * Return date range object for mongo find query
 * @param {Object} query Koa querystring object from ctx.request
 * @return {Object} Mongo compatible date range query object
 */

module.exports = (q) => {
  let start;
  let end;
  // If the number is more than 5 digits long, it's likely unix
  if (/\d{5,}/.test(q.start && (q.final || q.end))) {
    start = moment.utc(q.start * 1000);
    end = moment.utc(q.final * 1000 || q.end * 1000);
  } else {
    start = moment.utc(q.start);
    end = moment.utc(q.final || q.end);
  }

  return { $gte: start.toISOString(), $lte: end.toISOString() };
};
