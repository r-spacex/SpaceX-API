
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
    if (/^\/v2\/launches(.*)(?:\/)?$/i.test(r.url) || /^\/v2\/payloads(.*)(?:\/)?$/i.test(r.url)) {
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
      if (r.query.sort === 'launch_year') {
        query.launch_year = direction;
      }
      if (r.query.sort === 'launch_date_utc') {
        query.launch_date_utc = direction;
      }
      if (r.query.sort === 'launch_date_local') {
        query.launch_date_local = direction;
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
    } else if (/^\/v2\/parts\/caps(.*)(?:\/)?$/i.test(r.url)) {
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
    } else if (/^\/v2\/parts\/cores(.*)(?:\/)?$/i.test(r.url)) {
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
    } else if (/^\/v2\/info\/history(.*)(?:\/)?$/i.test(r.url)) {
      //------------------------------------------------------------
      //                     History Fields
      //------------------------------------------------------------

      if (r.query.sort === 'event_date_utc') {
        query.event_date_utc = direction;
      }
      if (r.query.sort === 'flight_number') {
        query.flight_number = direction;
      }
    }
  // Set sensible defaults for endpoint to sort on if no sort or order param is passed in the url
  } else if (/^\/v2\/launches(.*)(?:\/)?$/i.test(r.url) || /^\/v2\/payloads(.*)(?:\/)?$/i.test(r.url)) {
    query.flight_number = direction;
  } else if (/^\/v2\/info\/history(.*)(?:\/)?$/i.test(r.url)) {
    query.event_date_utc = direction;
  } else if (/^\/v2\/parts\/caps(.*)(?:\/)?$/i.test(r.url)) {
    query.original_launch = direction;
    query.capsule_serial = direction;
  } else if (/^\/v2\/parts\/cores(.*)(?:\/)?$/i.test(r.url)) {
    query.original_launch = direction;
    query.core_serial = direction;
  }

  return query;
};
