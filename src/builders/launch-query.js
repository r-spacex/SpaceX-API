
// Required to correctly output ObjectID's
const ObjectId = require('mongodb').ObjectID;


/**
 * Builds Mongo query for past/upcoming launch endpoints from querystrings
 * @param {Object} req The Express request object to access querystrings
 * @return {Object} Mongo compatible query object
 */

module.exports.launchQuery = (req) => {
  const query = {};

  if (req.query.flight_id) {
    // Mongo _id field requires underscore dangle
    // eslint-disable-next-line no-underscore-dangle
    query._id = ObjectId(req.query.flight_id);
  }
  if (req.query.start && req.query.final) {
    query.launch_date_utc = { $gte: `${req.query.start}T00:00:00Z`, $lte: `${req.query.final}T00:00:00Z` };
  }
  if (req.query.flight_number) {
    query.flight_number = parseInt(req.query.flight_number, 10);
  }
  if (req.query.launch_year) {
    query.launch_year = req.query.launch_year;
  }
  if (req.query.launch_date_utc) {
    query.launch_date_utc = req.query.launch_date_utc;
  }
  if (req.query.launch_date_local) {
    query.launch_date_local = req.query.launch_date_local;
  }
  if (req.query.rocket_id) {
    query['rocket.rocket_id'] = req.query.rocket_id;
  }
  if (req.query.rocket_name) {
    query['rocket.rocket_name'] = req.query.rocket_name;
  }
  if (req.query.rocket_type) {
    query['rocket.rocket_type'] = req.query.rocket_type;
  }
  if (req.query.core_serial) {
    query['rocket.first_stage.cores.core_serial'] = req.query.core_serial;
  }
  if (req.query.cap_serial) {
    query['rocket.second_stage.payloads.cap_serial'] = req.query.cap_serial;
  }
  if (req.query.core_flight) {
    query['rocket.first_stage.cores.flight'] = parseInt(req.query.core_flight, 10);
  }
  if (req.query.block) {
    query['rocket.first_stage.cores.block'] = parseInt(req.query.block, 10);
  }
  if (req.query.core_reuse) {
    query['reuse.core'] = (req.query.core_reuse === 'true');
  }
  if (req.query.side_core1_reuse) {
    query['reuse.side_core1'] = (req.query.side_core1_reuse === 'true');
  }
  if (req.query.side_core2_reuse) {
    query['reuse.side_core2'] = (req.query.side_core2_reuse === 'true');
  }
  if (req.query.fairings_reuse) {
    query['reuse.fairings'] = (req.query.fairings_reuse === 'true');
  }
  if (req.query.capsule_reuse) {
    query['reuse.capsule'] = (req.query.capsule_reuse === 'true');
  }
  if (req.query.site_id) {
    query['launch_site.site_id'] = req.query.site_id;
  }
  if (req.query.site_name) {
    query['launch_site.site_name'] = req.query.site_name;
  }
  if (req.query.site_name_long) {
    query['launch_site.site_name_long'] = req.query.site_name_long;
  }
  if (req.query.payload_id) {
    query['rocket.second_stage.payloads.payload_id'] = req.query.payload_id;
  }
  if (req.query.customer) {
    query['rocket.second_stage.payloads.customers'] = req.query.customer;
  }
  if (req.query.payload_type) {
    query['rocket.second_stage.payloads.payload_type'] = req.query.payload_type;
  }
  if (req.query.orbit) {
    query['rocket.second_stage.payloads.orbit'] = req.query.orbit;
  }
  if (req.query.launch_success) {
    query.launch_success = (req.query.launch_success === 'true');
  }
  if (req.query.reused) {
    query['rocket.first_stage.cores.reused'] = (req.query.reused === 'true');
  }
  if (req.query.land_success) {
    query['rocket.first_stage.cores.land_success'] = (req.query.land_success === 'true');
  }
  if (req.query.landing_type) {
    query['rocket.first_stage.cores.landing_type'] = req.query.landing_type;
  }
  if (req.query.landing_vehicle) {
    query['rocket.first_stage.cores.landing_vehicle'] = req.query.landing_vehicle;
  }
  return query;
};
