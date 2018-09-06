
/**
 * Builds Mongo query for mission data endpoints from querystrings
 * @param {Object} query Koa querystring object from ctx.request
 * @return {Object} Mongo compatible query object
 */

module.exports = q => {
  const query = {};

  if (q.mission_name) {
    query.mission_name = q.mission_name;
  }
  if (q.mission_id) {
    query.mission_id = q.mission_id;
  }
  if (q.manufacturer) {
    query.manufacturers = q.manufacturer;
  }
  if (q.payload_id) {
    query.payload_ids = q.payload_id;
  }

  return query;
};
