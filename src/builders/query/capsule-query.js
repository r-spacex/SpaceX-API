
/**
 * Builds Mongo query for capsule data endpoints from querystrings
 * @param {Object} query Koa querystring object from ctx.request
 * @return {Object} Mongo compatible query object
 */

module.exports = q => {
  const query = {};

  if (q.capsule_serial) {
    query.capsule_serial = q.capsule_serial;
  }
  if (q.capsule_id) {
    query.capsule_id = q.capsule_id;
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
  if (q.landings) {
    query.landings = parseInt(q.landings, 10);
  }
  if (q.type) {
    query.type = q.type;
  }

  return query;
};
