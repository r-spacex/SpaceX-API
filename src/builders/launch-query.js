
// Required to correctly output ObjectID's
const ObjectId = require('mongodb').ObjectID;

/**
 * Builds Mongo query for past/upcoming launch endpoints from querystrings
 * @param {Object} request The Koa context object to access querystrings
 * @return {Object} Mongo compatible query object
 */

module.exports = (request) => {
  const query = {};

  if (request.query.flight_id) {
    // Mongo _id field requires underscore dangle
    // eslint-disable-next-line no-underscore-dangle
    query._id = ObjectId(request.query.flight_id);
  }
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
      query.launch_date_utc = { $gte: startParsed.toISOString(), $lte: endParsed.toISOString() };
    } catch (e) {
      console.log(e);
    }
  }
  if (request.query.flight_number) {
    query.flight_number = parseInt(request.query.flight_number, 10);
  }
  if (request.query.launch_year) {
    query.launch_year = request.query.launch_year;
  }
  if (request.query.launch_date_utc) {
    query.launch_date_utc = request.query.launch_date_utc;
  }
  if (request.query.launch_date_local) {
    query.launch_date_local = request.query.launch_date_local;
  }
  if (request.query.rocket_id) {
    query['rocket.rocket_id'] = request.query.rocket_id;
  }
  if (request.query.rocket_name) {
    query['rocket.rocket_name'] = request.query.rocket_name;
  }
  if (request.query.rocket_type) {
    query['rocket.rocket_type'] = request.query.rocket_type;
  }
  if (request.query.core_serial) {
    query['rocket.first_stage.cores.core_serial'] = request.query.core_serial;
  }
  if (request.query.cap_serial) {
    query['rocket.second_stage.payloads.cap_serial'] = request.query.cap_serial;
  }
  if (request.query.core_flight) {
    query['rocket.first_stage.cores.flight'] = parseInt(request.query.core_flight, 10);
  }
  if (request.query.block) {
    query['rocket.first_stage.cores.block'] = parseInt(request.query.block, 10);
  }
  if (request.query.core_reuse) {
    query['reuse.core'] = (request.query.core_reuse === 'true');
  }
  if (request.query.side_core1_reuse) {
    query['reuse.side_core1'] = (request.query.side_core1_reuse === 'true');
  }
  if (request.query.side_core2_reuse) {
    query['reuse.side_core2'] = (request.query.side_core2_reuse === 'true');
  }
  if (request.query.fairings_reuse) {
    query['reuse.fairings'] = (request.query.fairings_reuse === 'true');
  }
  if (request.query.capsule_reuse) {
    query['reuse.capsule'] = (request.query.capsule_reuse === 'true');
  }
  if (request.query.site_id) {
    query['launch_site.site_id'] = request.query.site_id;
  }
  if (request.query.site_name) {
    query['launch_site.site_name'] = request.query.site_name;
  }
  if (request.query.site_name_long) {
    query['launch_site.site_name_long'] = request.query.site_name_long;
  }
  if (request.query.payload_id) {
    query['rocket.second_stage.payloads.payload_id'] = request.query.payload_id;
  }
  if (request.query.customer) {
    query['rocket.second_stage.payloads.customers'] = request.query.customer;
  }
  if (request.query.payload_type) {
    query['rocket.second_stage.payloads.payload_type'] = request.query.payload_type;
  }
  if (request.query.orbit) {
    query['rocket.second_stage.payloads.orbit'] = request.query.orbit;
  }
  if (request.query.launch_success) {
    query.launch_success = (request.query.launch_success === 'true');
  }
  if (request.query.reused) {
    query['rocket.first_stage.cores.reused'] = (request.query.reused === 'true');
  }
  if (request.query.land_success) {
    query['rocket.first_stage.cores.land_success'] = (request.query.land_success === 'true');
  }
  if (request.query.landing_type) {
    query['rocket.first_stage.cores.landing_type'] = request.query.landing_type;
  }
  if (request.query.landing_vehicle) {
    query['rocket.first_stage.cores.landing_vehicle'] = request.query.landing_vehicle;
  }
  return query;
};
