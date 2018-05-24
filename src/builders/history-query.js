
/**
 * Builds Mongo query for history endpints
 * @param {Object} request The Koa context object to access querystrings
 * @return {Object} Mongo compatible query object
 */

module.exports = (request) => {
  const query = {};

  // Allow date range comparisons using a veriety of date formats
  if (request.query.start && (request.query.final || request.query.end)) {
    let startParsed;
    let endParsed;
    const re = /^[0-9]*$/; // Matches any string of consecutive numbers ex. 1520314380
    if (re.test(request.query.start && (request.query.final || request.query.end))) {
      // If the date is unix, it is converted to a compatible date constructor param
      startParsed = new Date(request.query.start * 1000);
      endParsed = new Date(request.query.final * 1000 || request.query.end * 1000);
    } else {
      // If not unix, a date is created from the input
      startParsed = new Date(request.query.start);
      endParsed = new Date(request.query.final || request.query.end);
    }
    try {
      query.event_date_utc = { $gte: startParsed.toISOString(), $lte: endParsed.toISOString() };
    } catch (e) {
      console.log(e);
    }
  }
  if (request.query.flight_number) {
    query.flight_number = parseInt(request.query.flight_number, 10);
  }
  return query;
};
