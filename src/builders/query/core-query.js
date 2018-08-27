
/**
 * Builds Mongo query for core data endpoints from querystrings
 * @param {Object} query Koa querystring object from ctx.request
 * @return {Object} Mongo compatible query object
 */

module.exports = (q) => {
  const query = {};

  if (q.core_serial) {
    query.core_serial = q.core_serial;
  }

  if (q.block) {
    query.block = parseInt(q.block, 10);
  }

  if (q.status) {
    query.status = q.status;
  }

  if (q.original_launch) {
    query.original_launch = q.original_launch;
  }

  if (q.missions) {
    query.missions = q.missions;
  }

  if (q.rtls_attempt) {
    query.rtls_attempt = (q.rtls_attempt === 'true');
  }

  if (q.rtls_landings) {
    query.rtls_landings = parseInt(q.rtls_landings, 10);
  }

  if (q.asds_attempt) {
    query.asds_attempt = (q.asds_attempt === 'true');
  }

  if (q.asds_landings) {
    query.asds_landings = parseInt(q.asds_landings, 10);
  }

  if (q.water_landing) {
    query.water_landing = (q.water_landing === 'true');
  }

  return query;
};
