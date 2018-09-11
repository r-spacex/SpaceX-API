
/**
 * Builds Mongo query for ship data endpoint from querystrings
 * @param {Object} query Koa querystring object from ctx.request
 * @return {Object} Mongo compatible query object
 */

module.exports = q => {
  const query = {};

  if (q.ship_id) {
    query.ship_id = q.ship_id;
  }
  if (q.ship_name) {
    query.ship_name = q.ship_name;
  }
  if (q.ship_model) {
    query.ship_model = q.ship_model;
  }
  if (q.ship_type) {
    query.ship_type = q.ship_type;
  }
  if (q.role) {
    query.roles = q.role;
  }
  if (q.active) {
    query.active = (q.active === 'true');
  }
  if (q.imo) {
    query.imo = parseInt(q.imo, 10);
  }
  if (q.mmsi) {
    query.mmsi = parseInt(q.mmsi, 10);
  }
  if (q.abs) {
    query.abs = parseInt(q.abs, 10);
  }
  if (q.class) {
    query.class = parseInt(q.class, 10);
  }
  if (q.weight_lbs) {
    query.weight_lbs = parseInt(q.weight_lbs, 10);
  }
  if (q.weight_kg) {
    query.weight_kg = parseInt(q.weight_kg, 10);
  }
  if (q.year_built) {
    query.year_built = parseInt(q.year_built, 10);
  }
  if (q.home_port) {
    query.home_port = q.home_port;
  }
  if (q.status) {
    query.status = q.status;
  }
  if (q.speed_kn) {
    query.speed_kn = parseFloat(q.speed_kn);
  }
  if (q.course_deg) {
    query.course_deg = parseInt(q.course_deg, 10);
  }
  if (q.latitude) {
    query['position.latitude'] = parseFloat(q.latitude);
  }
  if (q.longitude) {
    query['position.longitude'] = parseFloat(q.longitude);
  }
  if (q.successful_landings) {
    query.successful_landings = q.successful_landings;
  }
  if (q.attempted_landings) {
    query.attempted_landings = q.attempted_landings;
  }
  if (q.mission) {
    query['missions.name'] = q.mission;
  }

  return query;
};
