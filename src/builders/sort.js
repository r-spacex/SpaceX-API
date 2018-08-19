
const order = require('./order');

/**
 * Builds Mongo sort object to set document order
 * @param {Object} query Koa querystring object from ctx.request
 * @return {Object} Mongo compatible sort object
 */

module.exports = (q) => {
  const query = {};
  const direction = order(q);

  if ('sort' in q) {
    if (q.sort === 'flight_id') {
    // Mongo _id field requires underscore dangle
    // eslint-disable-next-line no-underscore-dangle
      query._id = direction;
    }

    if (q.sort === 'flight_number') {
      query.flight_number = direction;
    }

    if (q.sort === 'launch_year') {
      query.launch_year = direction;
    }

    if (q.sort === 'launch_date_utc') {
      query.launch_date_utc = direction;
    }

    if (q.sort === 'launch_date_local') {
      query.launch_date_local = direction;
    }

    if (q.sort === 'rocket_id') {
      query['rocket.rocket_id'] = direction;
    }

    if (q.sort === 'rocket_name') {
      query['rocket.rocket_name'] = direction;
    }

    if (q.sort === 'rocket_type') {
      query['rocket.rocket_type'] = direction;
    }

    if (q.sort === 'core_serial') {
      query['rocket.first_stage.cores.core_serial'] = direction;
    }

    if (q.sort === 'cap_serial') {
      query['rocket.second_stage.payloads.cap_serial'] = direction;
    }

    if (q.sort === 'core_flight') {
      query['rocket.first_stage.cores.flight'] = direction;
    }

    if (q.sort === 'block') {
      query['rocket.first_stage.cores.block'] = direction;
    }

    if (q.sort === 'second_stage_block') {
      query['rocket.second_stage.block'] = direction;
    }

    if (q.sort === 'core_reuse') {
      query['reuse.core'] = direction;
    }

    if (q.sort === 'side_core1_reuse') {
      query['reuse.side_core1'] = direction;
    }

    if (q.sort === 'side_core2_reuse') {
      query['reuse.side_core2'] = direction;
    }

    if (q.sort === 'fairings_reuse') {
      query['reuse.fairings'] = direction;
    }

    if (q.sort === 'capsule_reuse') {
      query['reuse.capsule'] = direction;
    }

    if (q.sort === 'site_id') {
      query['launch_site.site_id'] = direction;
    }

    if (q.sort === 'site_name') {
      query['launch_site.site_name'] = direction;
    }

    if (q.sort === 'site_name_long') {
      query['launch_site.site_name_long'] = direction;
    }

    if (q.sort === 'payload_id') {
      query['rocket.second_stage.payloads.payload_id'] = direction;
    }

    if (q.sort === 'norad_id') {
      query['rocket.second_stage.payloads.norad_id'] = direction;
    }

    if (q.sort === 'customer') {
      query['rocket.second_stage.payloads.customers'] = direction;
    }

    if (q.sort === 'nationality') {
      query['rocket.second_stage.payloads.nationality'] = direction;
    }

    if (q.sort === 'manufacturer') {
      query['rocket.second_stage.payloads.manufacturer'] = direction;
    }

    if (q.sort === 'payload_type') {
      query['rocket.second_stage.payloads.payload_type'] = direction;
    }

    if (q.sort === 'orbit') {
      query['rocket.second_stage.payloads.orbit'] = direction;
    }

    if (q.sort === 'launch_success') {
      query.launch_success = direction;
    }

    if (q.sort === 'reused') {
      query['rocket.first_stage.cores.reused'] = direction;
    }

    if (q.sort === 'land_success') {
      query['rocket.first_stage.cores.land_success'] = direction;
    }

    if (q.sort === 'landing_type') {
      query['rocket.first_stage.cores.landing_type'] = direction;
    }

    if (q.sort === 'landing_vehicle') {
      query['rocket.first_stage.cores.landing_vehicle'] = direction;
    }
  } else {
    query.flight_number = direction;
  }

  return query;
};
