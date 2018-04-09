
/**
 * Builds Mongo query for capsule data endpoints from querystrings
 * @param {Object} request The Koa context object to access querystrings
 * @return {Object} Mongo compatible query object
 */

module.exports = (request) => {
  const query = {};

  if (request.query.capsule_serial) {
    query.capsule_serial = request.query.capsule_serial;
  }
  if (request.query.capsule_id) {
    query.capsule_id = request.query.capsule_id;
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
  if (request.query.landings) {
    query.landings = parseInt(request.query.landings, 10);
  }
  if (request.query.type) {
    query.type = request.query.type;
  }
  return query;
};
