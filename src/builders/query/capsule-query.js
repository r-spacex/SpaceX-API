
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
  if (q.mission) {
    query['missions.name'] = q.mission;
  }
  if (q.landings) {
    query.landings = parseInt(q.landings, 10);
  }
  if (q.type) {
    query.type = q.type;
  }
  if (q.reuse_count) {
    query.reuse_count = parseInt(q.reuse_count, 10);
  }

  return query;
};
