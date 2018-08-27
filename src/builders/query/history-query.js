
const dateRange = require('../../utilities/date_range');

/**
 * Builds Mongo query for history endpints
 * @param {Object} query Koa querystring object from ctx.request
 * @return {Object} Mongo compatible query object
 */

module.exports = q => {
  const query = {};

  if (q.start && (q.final || q.end)) {
    query.event_date_utc = dateRange(q);
  }

  if (q.flight_number) {
    query.flight_number = parseInt(q.flight_number, 10);
  }

  return query;
};
