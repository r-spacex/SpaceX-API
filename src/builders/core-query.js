
/**
 * Builds Mongo query for core data endpoints from querystrings
 * @param {Object} request The Koa context object to access querystrings
 * @return {Object} Mongo compatible query object
 */

module.exports = (request) => {
  const query = {};

  if (request.query.core_serial) {
    query.core_serial = request.query.core_serial;
  }
  if (request.query.block) {
    query.block = parseInt(request.query.block, 10);
  }
  if (request.query.status) {
    query.status = request.query.status;
  }
  if (request.query.original_launch) {
    query.original_launch = request.query.original_launch;
  }
  if (request.query.missions) {
    query.missions = request.query.missions;
  }
  if (request.query.rtls_attempt) {
    query.rtls_attempt = (request.query.rtls_attempt === 'true');
  }
  if (request.query.rtls_landings) {
    query.rtls_landings = parseInt(request.query.rtls_landings, 10);
  }
  if (request.query.asds_attempt) {
    query.asds_attempt = (request.query.asds_attempt === 'true');
  }
  if (request.query.asds_landings) {
    query.asds_landings = parseInt(request.query.asds_landings, 10);
  }
  if (request.query.water_landing) {
    query.water_landing = (request.query.water_landing === 'true');
  }
  return query;
};
