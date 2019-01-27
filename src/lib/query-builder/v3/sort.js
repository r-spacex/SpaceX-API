
const order = require('./order');

/**
 * Builds and returns mongo sort object for specific querystring fields.
 * Checks sort order from the order param, then checks if the sort param
 * contains any of the following fields. If so, they are added to an object
 * compatiable with the sort fields in a mongo query
 * @param {Object} request Koa request object from ctx
 * @return {Object} Mongo compatible sort object
 */

module.exports = (r) => {
  const query = {};
  const direction = order(r.query);

  if ('sort' in r.query) {
    if (/^\/v3\/launches(.*)(?:\/)?$/i.test(r.url) || /^\/v3\/payloads(.*)(?:\/)?$/i.test(r.url)) {
      //------------------------------------------------------------
      //                       Launch Fields
      //------------------------------------------------------------
      if (r.query.sort === 'flight_id') {
      // Mongo _id field requires underscore dangle
      // eslint-disable-next-line no-underscore-dangle
        query._id = direction;
      }
      if (r.query.sort === 'flight_number') {
        query.flight_number = direction;
      }
      if (r.query.sort === 'mission_name') {
        query.mission_name = direction;
      }
      if (r.query.sort === 'mission_id') {
        query.mission_id = direction;
      }
      if (r.query.sort === 'launch_year') {
        query.launch_year = direction;
      }
      if (r.query.sort === 'launch_date_utc') {
        query.launch_date_utc = direction;
      }
      if (r.query.sort === 'launch_date_local') {
        query.launch_date_local = direction;
      }
      if (r.query.sort === 'tentative') {
        query.is_tentative = direction;
      }
      if (r.query.sort === 'tentative_max_precision') {
        query.tentative_max_precision = direction;
      }
      if (r.query.sort === 'tbd') {
        query.tbd = direction;
      }
      if (r.query.sort === 'rocket_id') {
        query['rocket.rocket_id'] = direction;
      }
      if (r.query.sort === 'rocket_name') {
        query['rocket.rocket_name'] = direction;
      }
      if (r.query.sort === 'rocket_type') {
        query['rocket.rocket_type'] = direction;
      }
      if (r.query.sort === 'core_serial') {
        query['rocket.first_stage.cores.core_serial'] = direction;
      }
      if (r.query.sort === 'cap_serial') {
        query['rocket.second_stage.payloads.cap_serial'] = direction;
      }
      if (r.query.sort === 'core_flight') {
        query['rocket.first_stage.cores.flight'] = direction;
      }
      if (r.query.sort === 'block') {
        query['rocket.first_stage.cores.block'] = direction;
      }
      if (r.query.sort === 'gridfins') {
        query['rocket.first_stage.cores.gridfins'] = direction;
      }
      if (r.query.sort === 'legs') {
        query['rocket.first_stage.cores.legs'] = direction;
      }
      if (r.query.sort === 'second_stage_block') {
        query['rocket.second_stage.block'] = direction;
      }
      if (r.query.sort === 'core_reuse') {
        query['reuse.core'] = direction;
      }
      if (r.query.sort === 'side_core1_reuse') {
        query['reuse.side_core1'] = direction;
      }
      if (r.query.sort === 'side_core2_reuse') {
        query['reuse.side_core2'] = direction;
      }
      if (r.query.sort === 'fairings_reuse') {
        query['reuse.fairings'] = direction;
      }
      if (r.query.sort === 'capsule_reuse') {
        query['reuse.capsule'] = direction;
      }
      if (r.query.sort === 'site_id') {
        query['launch_site.site_id'] = direction;
      }
      if (r.query.sort === 'site_name') {
        query['launch_site.site_name'] = direction;
      }
      if (r.query.sort === 'site_name_long') {
        query['launch_site.site_name_long'] = direction;
      }
      if (r.query.sort === 'payload_id') {
        query['rocket.second_stage.payloads.payload_id'] = direction;
      }
      if (r.query.sort === 'norad_id') {
        query['rocket.second_stage.payloads.norad_id'] = direction;
      }
      if (r.query.sort === 'customer') {
        query['rocket.second_stage.payloads.customers'] = direction;
      }
      if (r.query.sort === 'nationality') {
        query['rocket.second_stage.payloads.nationality'] = direction;
      }
      if (r.query.sort === 'manufacturer') {
        query['rocket.second_stage.payloads.manufacturer'] = direction;
      }
      if (r.query.sort === 'payload_type') {
        query['rocket.second_stage.payloads.payload_type'] = direction;
      }
      if (r.query.sort === 'orbit') {
        query['rocket.second_stage.payloads.orbit'] = direction;
      }
      if (r.query.sort === 'reference_system') {
        query['rocket.second_stage.payloads.orbit_params.reference_system'] = direction;
      }
      if (r.query.sort === 'regime') {
        query['rocket.second_stage.payloads.orbit_params.regime'] = direction;
      }
      if (r.query.sort === 'longitude') {
        query['rocket.second_stage.payloads.orbit_params.longitude'] = direction;
      }
      if (r.query.sort === 'semi_major_axis_km') {
        query['rocket.second_stage.payloads.orbit_params.semi_major_axis_km'] = direction;
      }
      if (r.query.sort === 'eccentricity') {
        query['rocket.second_stage.payloads.orbit_params.eccentricity'] = direction;
      }
      if (r.query.sort === 'periapsis_km') {
        query['rocket.second_stage.payloads.orbit_params.periapsis_km'] = direction;
      }
      if (r.query.sort === 'apoapsis_km') {
        query['rocket.second_stage.payloads.orbit_params.apoapsis_km'] = direction;
      }
      if (r.query.sort === 'inclination_deg') {
        query['rocket.second_stage.payloads.orbit_params.inclination_deg'] = direction;
      }
      if (r.query.sort === 'period_min') {
        query['rocket.second_stage.payloads.orbit_params.period_min'] = direction;
      }
      if (r.query.sort === 'lifespan_years') {
        query['rocket.second_stage.payloads.orbit_params.lifespan_years'] = direction;
      }
      if (r.query.sort === 'epoch') {
        query['rocket.second_stage.payloads.orbit_params.epoch'] = direction;
      }
      if (r.query.sort === 'mean_motion') {
        query['rocket.second_stage.payloads.orbit_params.mean_motion'] = direction;
      }
      if (r.query.sort === 'raan') {
        query['rocket.second_stage.payloads.orbit_params.raan'] = direction;
      }
      if (r.query.sort === 'fairings_reused') {
        query['rocket.fairings.reused'] = direction;
      }
      if (r.query.sort === 'fairings_recovery_attempt') {
        query['rocket.fairings.recovery_attempt'] = direction;
      }
      if (r.query.sort === 'fairings_recovered') {
        query['rocket.fairings.recovered'] = direction;
      }
      if (r.query.sort === 'fairings_ship') {
        query['rocket.fairings.ship'] = direction;
      }
      if (r.query.sort === 'launch_success') {
        query.launch_success = direction;
      }
      if (r.query.sort === 'reused') {
        query['rocket.first_stage.cores.reused'] = direction;
      }
      if (r.query.sort === 'land_success') {
        query['rocket.first_stage.cores.land_success'] = direction;
      }
      if (r.query.sort === 'landing_intent') {
        query['rocket.first_stage.cores.landing_intent'] = direction;
      }
      if (r.query.sort === 'landing_type') {
        query['rocket.first_stage.cores.landing_type'] = direction;
      }
      if (r.query.sort === 'landing_vehicle') {
        query['rocket.first_stage.cores.landing_vehicle'] = direction;
      }
      if (r.query.sort === 'ship') {
        query.ships = direction;
      }
    } else if (/^\/v3\/capsules(.*)(?:\/)?$/i.test(r.url)) {
      //------------------------------------------------------------
      //                       Capsule Fields
      //------------------------------------------------------------

      if (r.query.sort === 'capsule_serial') {
        query.capsule_serial = direction;
      }
      if (r.query.sort === 'capsule_id') {
        query.capsule_id = direction;
      }
      if (r.query.sort === 'status') {
        query.status = direction;
      }
      if (r.query.sort === 'original_launch') {
        query.original_launch = direction;
      }
      if (r.query.sort === 'landings') {
        query.landings = direction;
      }
      if (r.query.sort === 'type') {
        query.type = direction;
      }
      if (r.query.sort === 'reuse_count') {
        query.reuse_count = direction;
      }
    } else if (/^\/v3\/cores(.*)(?:\/)?$/i.test(r.url)) {
      //------------------------------------------------------------
      //                       Core Fields
      //------------------------------------------------------------

      if (r.query.sort === 'core_serial') {
        query.core_serial = direction;
      }
      if (r.query.sort === 'block') {
        query.block = direction;
      }
      if (r.query.sort === 'status') {
        query.status = direction;
      }
      if (r.query.sort === 'original_launch') {
        query.original_launch = direction;
      }
      if (r.query.sort === 'reuse_count') {
        query.reuse_count = direction;
      }
      if (r.query.sort === 'rtls_attempts') {
        query.rtls_attempts = direction;
      }
      if (r.query.sort === 'rtls_landings') {
        query.rtls_landings = direction;
      }
      if (r.query.sort === 'asds_attempts') {
        query.asds_attempts = direction;
      }
      if (r.query.sort === 'asds_landings') {
        query.asds_landings = direction;
      }
      if (r.query.sort === 'water_landing') {
        query.water_landing = direction;
      }
    } else if (/^\/v3\/history(.*)(?:\/)?$/i.test(r.url)) {
      //------------------------------------------------------------
      //                     History Fields
      //------------------------------------------------------------

      if (r.query.sort === 'event_date_utc') {
        query.event_date_utc = direction;
      }
      if (r.query.sort === 'flight_number') {
        query.flight_number = direction;
      }
    } else if (/^\/v3\/ships(.*)(?:\/)?$/i.test(r.url)) {
      //------------------------------------------------------------
      //                     Ships Fields
      //------------------------------------------------------------

      if (r.query.sort === 'ship_id') {
        query.ship_id = direction;
      }
      if (r.query.sort === 'ship_name') {
        query.ship_name = direction;
      }
      if (r.query.sort === 'ship_model') {
        query.ship_model = direction;
      }
      if (r.query.sort === 'roles') {
        query.roles = direction;
      }
      if (r.query.sort === 'active') {
        query.active = direction;
      }
      if (r.query.sort === 'imo') {
        query.imo = direction;
      }
      if (r.query.sort === 'mmsi') {
        query.mmsi = direction;
      }
      if (r.query.sort === 'abs') {
        query.abs = direction;
      }
      if (r.query.sort === 'class') {
        query.class = direction;
      }
      if (r.query.sort === 'weight_lbs') {
        query.weight_lbs = direction;
      }
      if (r.query.sort === 'weight_kg') {
        query.weight_kg = direction;
      }
      if (r.query.sort === 'year_built') {
        query.year_built = direction;
      }
      if (r.query.sort === 'home_port') {
        query.home_port = direction;
      }
      if (r.query.sort === 'status') {
        query.status = direction;
      }
      if (r.query.sort === 'speed_kn') {
        query.speed_kn = direction;
      }
      if (r.query.sort === 'course_deg') {
        query.course_deg = direction;
      }
      if (r.query.sort === 'latitude') {
        query['position.latitude'] = direction;
      }
      if (r.query.sort === 'longitude') {
        query['position.longitude'] = direction;
      }
      if (r.query.sort === 'successful_landings') {
        query.successful_landings = direction;
      }
      if (r.query.sort === 'attempted_landings') {
        query.attempted_landings = direction;
      }
      if (r.query.sort === 'missions') {
        query.missions = direction;
      }
    }
  // Set sensible defaults for endpoint to sort on if no sort or order param is passed in the url
  } else if (/^\/v3\/launches(.*)(?:\/)?$/i.test(r.url) || /^\/v3\/payloads(.*)(?:\/)?$/i.test(r.url)) {
    query.flight_number = direction;
  } else if (/^\/v3\/history(.*)(?:\/)?$/i.test(r.url)) {
    query.event_date_utc = direction;
  } else if (/^\/v3\/capsules(.*)(?:\/)?$/i.test(r.url)) {
    query.original_launch = direction;
    query.capsule_serial = direction;
  } else if (/^\/v3\/cores(.*)(?:\/)?$/i.test(r.url)) {
    query.original_launch = direction;
    query.core_serial = direction;
  } else if (/^\/v3\/ships(.*)(?:\/)?$/i.test(r.url)) {
    query.ship_id = direction;
  }

  return query;
};
