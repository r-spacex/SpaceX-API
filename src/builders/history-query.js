
/**
 * Builds Mongo query for history endpints
 * @param {Object} query Koa querystring object from ctx.request
 * @return {Object} Mongo compatible query object
 */

module.exports = (q) => {
  const query = {};

  // Allow date range comparisons using a variety of date formats
  if (q.start && (q.final || q.end)) {
    let startParsed;
    let endParsed;
    // Matches any string of consecutive numbers ex. 1520314380
    if (/^[0-9]*$/.test(q.start && (q.final || q.end))) {
      // If the date is unix, it is converted to a compatible date object
      startParsed = new Date(q.start * 1000);
      endParsed = new Date(q.final * 1000 || q.end * 1000);
    } else {
      // If not unix, a date object is created from the input
      startParsed = new Date(q.start);
      endParsed = new Date(q.final || q.end);
    }
    try {
      query.event_date_utc = { $gte: startParsed.toISOString(), $lte: endParsed.toISOString() };
    } catch (e) {
      console.log(e);
    }
  }

  if (q.flight_number) {
    query.flight_number = parseInt(q.flight_number, 10);
  }

  return query;
};
