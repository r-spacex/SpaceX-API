
// Required to correctly output ObjectID's
const ObjectId = require('mongodb').ObjectID;
const moment = require('moment');
const dateRange = require('../../utilities/date_range');

/**
 * Builds mongo query for past/upcoming launch endpoints from querystrings
 * @param {Object} query The Koa query object from ctx.request
 * @return {Object} Mongo compatible find query object
 */

module.exports = q => {
  const query = {};

  if (q.flight_id) {
    // Mongo _id field requires underscore dangle
    // eslint-disable-next-line no-underscore-dangle
    query._id = ObjectId(q.flight_id);
  }
  if (q.start && (q.final || q.end)) {
    query.launch_date_utc = dateRange(q);
  }
  if (q.flight_number) {
    query.flight_number = parseInt(q.flight_number, 10);
  }
  if (q.mission_name) {
    query.mission_name = q.mission_name;
  }
  if (q.mission_id) {
    query.mission_id = q.mission_id;
  }
  if (q.launch_year) {
    query.launch_year = q.launch_year;
  }
  if (q.launch_date_utc) {
    // Allow any valid date format
    const date = moment(q.launch_date_utc);
    try {
      query.launch_date_utc = date.toISOString();
    } catch (e) {
      console.log(e);
    }
  }
  if (q.launch_date_local) {
    query.launch_date_local = q.launch_date_local;
  }
  if (q.tentative) {
    query.is_tentative = q.tentative;
  }
  if (q.tentative_max_precision) {
    query.tentative_max_precision = q.tentative_max_precision;
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
  if (q.fairings_reused) {
    query['rocket.fairings.reused'] = (q.fairings_reused === 'true');
  }
  if (q.fairings_recovery_attempt) {
    query['rocket.fairings.recovery_attempt'] = (q.fairings_recovery_attempt === 'true');
  }
  if (q.fairings_recovered) {
    query['rocket.fairings.recovered'] = (q.fairings_recovered === 'true');
  }
  if (q.fairings_ship) {
    query['rocket.fairings.ship'] = q.fairings_ship;
  }
  if (q.core_reuse) {
    query['rocket.first_stage.cores.0.reused'] = (q.core_reuse === 'true');
  }
  if (q.side_core1_reuse) {
    query['rocket.first_stage.cores.1.reused'] = (q.side_core1_reuse === 'true');
  }
  if (q.side_core2_reuse) {
    query['rocket.first_stage.cores.2.reused'] = (q.side_core2_reuse === 'true');
  }
  if (q.fairings_reuse) {
    query['rocket.fairings.reused'] = (q.fairings_reuse === 'true');
  }
  if (q.capsule_reuse) {
    query['rocket.second_stage.payloads.reused'] = (q.capsule_reuse === 'true');
    query.$or = [
      {
        'rocket.second_stage.payloads.payload_type': 'Dragon 1.1',
      },
      {
        'rocket.second_stage.payloads.payload_type': 'Crew Dragon',
      },
    ];
  }
  if (q.ship) {
    query.ships = q.ship;
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
  if (q.reference_system) {
    query['rocket.second_stage.payloads.orbit_params.reference_system'] = q.reference_system;
  }
  if (q.regime) {
    query['rocket.second_stage.payloads.orbit_params.regime'] = q.regime;
  }
  if (q.longitude) {
    query['rocket.second_stage.payloads.orbit_params.longitude'] = parseFloat(q.longitude);
  }
  if (q.semi_major_axis_km) {
    query['rocket.second_stage.payloads.orbit_params.semi_major_axis_km'] = parseFloat(q.semi_major_axis_km);
  }
  if (q.eccentricity) {
    query['rocket.second_stage.payloads.orbit_params.eccentricity'] = parseFloat(q.eccentricity);
  }
  if (q.periapsis_km) {
    query['rocket.second_stage.payloads.orbit_params.periapsis_km'] = parseFloat(q.periapsis_km);
  }
  if (q.apoapsis_km) {
    query['rocket.second_stage.payloads.orbit_params.apoapsis_km'] = parseFloat(q.apoapsis_km);
  }
  if (q.inclination_deg) {
    query['rocket.second_stage.payloads.orbit_params.inclination_deg'] = parseFloat(q.inclination_deg);
  }
  if (q.period_min) {
    query['rocket.second_stage.payloads.orbit_params.period_min'] = parseFloat(q.period_min);
  }
  if (q.lifespan_years) {
    query['rocket.second_stage.payloads.orbit_params.lifespan_years'] = parseInt(q.lifespan_years, 10);
  }
  if (q.epoch) {
    query['rocket.second_stage.payloads.orbit_params.epoch'] = q.epoch;
  }
  if (q.mean_motion) {
    query['rocket.second_stage.payloads.orbit_params.mean_motion'] = parseFloat(q.mean_motion);
  }
  if (q.raan) {
    query['rocket.second_stage.payloads.orbit_params.raan'] = parseFloat(q.raan);
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
