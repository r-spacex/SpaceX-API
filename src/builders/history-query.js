
/**
 * Builds Mongo query for history endpints
 * @param {Object} req The Koa context object to access querystrings
 * @return {Object} Mongo compatible query object
 */

module.exports = (req) => {
  const query = {};

  // Allow date range comparisons using a variety of date formats
  if (req.query.start && (req.query.final || req.query.end)) {
    let startParsed;
    let endParsed;
    // Matches any string of consecutive numbers ex. 1520314380
    if (/^[0-9]*$/.test(req.query.start && (req.query.final || req.query.end))) {
      // If the date is unix, it is converted to a compatible date object
      startParsed = new Date(req.query.start * 1000);
      endParsed = new Date(req.query.final * 1000 || req.query.end * 1000);
    } else {
      // If not unix, a date object is created from the input
      startParsed = new Date(req.query.start);
      endParsed = new Date(req.query.final || req.query.end);
    }
    try {
      query.event_date_utc = { $gte: startParsed.toISOString(), $lte: endParsed.toISOString() };
    } catch (e) {
      console.log(e);
    }
  }

  if (req.query.flight_number) {
    query.flight_number = parseInt(req.query.flight_number, 10);
  }

  return query;
};
