
// Required to correctly output ObjectID's
const ObjectId = require('mongodb').ObjectID;

/**
 * Builds mongo query for past/upcoming launch endpoints from querystrings
 * @param {Object} query The Koa query object from ctx.request
 * @return {Object} Mongo compatible find query object
 */

module.exports = (q) => {
  const query = {};

  if (q.flight_id) {
    // Mongo _id field requires underscore dangle
    // eslint-disable-next-line no-underscore-dangle
    query._id = ObjectId(q.flight_id);
  }

  // Allow date range comparisons using a variety of date formats
  if (q.start && (q.final || q.end)) {
    let startParsed;
    let endParsed;
    // Matches any string of consecutive numbers ex. 1520314380
    // If the date is unix, it is converted to a compatible date constructor param
    if (/^[0-9]*$/.test(q.start && (q.final || q.end))) {
      startParsed = new Date(q.start * 1000);
      endParsed = new Date(q.final * 1000 || q.end * 1000);
    } else {
      // If not unix, a date is created from the input
      startParsed = new Date(q.start);
      endParsed = new Date(q.final || q.end);
    }
    try {
      query.launch_date_utc = { $gte: startParsed.toISOString(), $lte: endParsed.toISOString() };
    } catch (e) {
      console.log(e);
    }
  }

  if (q.flight_number) {
    query.flight_number = parseInt(q.flight_number, 10);
  }

  if (q.launch_year) {
    query.launch_year = q.launch_year;
  }

  if (q.launch_date_utc) {
    // Allow any valid date format
    const date = new Date(q.launch_date_utc);
    try {
      query.launch_date_utc = date.toISOString();
    } catch (e) {
      console.log(e);
    }
  }

  if (q.launch_date_local) {
    query.launch_date_local = q.launch_date_local;
  }

  if (q.rocket_id) {
    query['rocket.rocket_id'] = q.rocket_id;
  }

  if (q.rocket_name) {
    query['rocket.rocket_name'] = q.rocket_name;
  }

  if (q.rocket_type) {
    query['rocket.rocket_type'] = q.rocket_type;
  }

  if (q.core_serial) {
    query['rocket.first_stage.cores.core_serial'] = q.core_serial;
  }

  if (q.cap_serial) {
    query['rocket.second_stage.payloads.cap_serial'] = q.cap_serial;
  }

  if (q.core_flight) {
    query['rocket.first_stage.cores.flight'] = parseInt(q.core_flight, 10);
  }

  if (q.block) {
    query['rocket.first_stage.cores.block'] = parseInt(q.block, 10);
  }

  if (q.second_stage_block) {
    query['rocket.second_stage.block'] = parseInt(q.second_stage_block, 10);
  }

  if (q.core_reuse) {
    query['reuse.core'] = (q.core_reuse === 'true');
  }

  if (q.side_core1_reuse) {
    query['reuse.side_core1'] = (q.side_core1_reuse === 'true');
  }

  if (q.side_core2_reuse) {
    query['reuse.side_core2'] = (q.side_core2_reuse === 'true');
  }

  if (q.fairings_reuse) {
    query['reuse.fairings'] = (q.fairings_reuse === 'true');
  }

  if (q.capsule_reuse) {
    query['reuse.capsule'] = (q.capsule_reuse === 'true');
  }

  if (q.site_id) {
    query['launch_site.site_id'] = q.site_id;
  }

  if (q.site_name) {
    query['launch_site.site_name'] = q.site_name;
  }

  if (q.site_name_long) {
    query['launch_site.site_name_long'] = q.site_name_long;
  }

  if (q.payload_id) {
    query['rocket.second_stage.payloads.payload_id'] = q.payload_id;
  }

  if (q.norad_id) {
    query['rocket.second_stage.payloads.norad_id'] = parseInt(q.norad_id, 10);
  }

  if (q.customer) {
    query['rocket.second_stage.payloads.customers'] = q.customer;
  }

  if (q.nationality) {
    query['rocket.second_stage.payloads.nationality'] = q.nationality;
  }

  if (q.manufacturer) {
    query['rocket.second_stage.payloads.manufacturer'] = q.manufacturer;
  }

  if (q.payload_type) {
    query['rocket.second_stage.payloads.payload_type'] = q.payload_type;
  }

  if (q.orbit) {
    query['rocket.second_stage.payloads.orbit'] = q.orbit;
  }

  if (q.launch_success) {
    query.launch_success = (q.launch_success === 'true');
  }

  if (q.reused) {
    query['rocket.first_stage.cores.reused'] = (q.reused === 'true');
  }

  if (q.land_success) {
    query['rocket.first_stage.cores.land_success'] = (q.land_success === 'true');
  }

  if (q.landing_type) {
    query['rocket.first_stage.cores.landing_type'] = q.landing_type;
  }

  if (q.landing_vehicle) {
    query['rocket.first_stage.cores.landing_vehicle'] = q.landing_vehicle;
  }

  return query;
};
