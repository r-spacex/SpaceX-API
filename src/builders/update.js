
const validator = require('validator');

/**
 * Builds mongo query for past/upcoming launch endpoints from querystrings
 * @param {Object} body The Koa response body object
 * @param {Object} payload_index The cores array index to update
 * @param {Object} core_index The payloads array index to update
 * @return {Object} Mongo compatible find query object
 */

module.exports = (body, payload_index, core_index) => {
  const query = { $set: {} };

  if (body.flight_number && validator.isInt(String(body.flight_number))) {
    query.$set.flight_number = parseInt(body.flight_number, 10);
  }

  //------------------------------------------------------------
  //                     Launch Dates
  //------------------------------------------------------------
  if (body.launch_year && validator.isNumeric(String(body.launch_year))) {
    query.$set.launch_year = String(body.launch_year);
  }
  if (body.launch_date_utc && validator.isISO8601(String(body.launch_date_utc))) {
    query.$set.launch_date_utc = String(body.launch_date_utc);
  }
  if (body.launch_date_local && validator.isISO8601(String(body.launch_date_local))) {
    query.$set.launch_date_local = String(body.launch_date_local);
  }

  //------------------------------------------------------------
  //                     Rocket Details
  //------------------------------------------------------------
  if (body.rocket_id && validator.isAlphanumeric(String(body.rocket_id))) {
    query.$set['rocket.rocket_id'] = String(body.rocket_id);
  }
  if (body.rocket_name && validator.isAlphanumeric(String(body.rocket_name))) {
    query.$set['rocket.rocket_name'] = String(body.rocket_name);
  }
  if (body.rocket_type && validator.isAlphanumeric(String(body.rocket_type))) {
    query.$set['rocket.rocket_type'] = String(body.rocket_type);
  }

  //------------------------------------------------------------
  //                   Cores + Second Stage Block
  //------------------------------------------------------------
  if (body.core_serial && validator.isAlphanumeric(String(body.core_serial))) {
    query.$set[`rocket.first_stage.cores.${core_index}.core_serial`] = String(body.core_serial);
  }
  if (body.core_flight && validator.isNumeric(String(body.core_flight))) {
    query.$set[`rocket.first_stage.cores.${core_index}.flight`] = parseInt(body.core_flight, 10);
  }
  if (body.block && validator.isNumeric(String(body.block))) {
    query.$set[`rocket.first_stage.cores.${core_index}.block`] = parseInt(body.block, 10);
  }
  if (body.reused && validator.isBoolean(String(body.reused))) {
    query.$set[`rocket.first_stage.cores.${core_index}.reused`] = (String(body.reused) === 'true');
  }
  if (body.land_success && validator.isBoolean(String(body.land_success))) {
    query.$set[`rocket.first_stage.cores.${core_index}.land_success`] = (String(body.land_success) === 'true');
  }
  if (body.landing_type && validator.isAlphanumeric(String(body.landing_type))) {
    query.$set[`rocket.first_stage.cores.${core_index}.landing_type`] = String(body.landing_type);
  }
  if (body.landing_vehicle && validator.isAlphanumeric(String(body.landing_vehicle))) {
    query.$set[`rocket.first_stage.cores.${core_index}.landing_vehicle`] = String(body.landing_vehicle);
  }
  if (body.second_stage_block && validator.isNumeric(String(body.second_stage_block))) {
    query.$set['rocket.second_stage.block'] = parseInt(body.second_stage_block, 10);
  }

  //------------------------------------------------------------
  //                       Fairings
  //------------------------------------------------------------
  if (body.fairings_reused && validator.isBoolean(String(body.fairings_reused))) {
    query.$set['rocket.fairings.reused'] = (String(body.fairings_reused) === 'true');
  }
  if (body.fairings_recovery_attempt && validator.isBoolean(String(body.fairings_recovery_attempt))) {
    query.$set['rocket.fairings.recovery_attempt'] = (String(body.fairings_recovery_attempt) === 'true');
  }
  if (body.fairings_recovered && validator.isBoolean(String(body.fairings_recovered))) {
    query.$set['rocket.fairings.recovered'] = (String(body.fairings_recovered) === 'true');
  }
  if (body.fairings_ship && validator.isAlphanumeric(String(body.fairings_ship))) {
    query.$set['rocket.fairings.ship'] = String(body.fairings_ship);
  }

  //------------------------------------------------------------
  //                       Site Names
  //------------------------------------------------------------
  if (body.site_id && validator.isAlphanumeric(String(body.site_id))) {
    query.$set['launch_site.site_id'] = String(body.site_id);
  }
  if (body.site_name && validator.isAlphanumeric(String(body.site_name))) {
    query.$set['launch_site.site_name'] = String(body.site_name);
  }
  if (body.site_name_long && validator.isAlphanumeric(String(body.site_name_long))) {
    query.$set['launch_site.site_name_long'] = String(body.site_name_long);
  }

  //------------------------------------------------------------
  //                 Telemetery + Launch Success
  //------------------------------------------------------------
  if (body.telemetery && validator.isAlphanumeric(String(body.telemetery))) {
    query.$set.telemetery.flight_club = String(body.telemetery);
  }
  if (body.launch_success && validator.isBoolean(String(body.launch_success))) {
    query.$set.launch_success = (String(body.launch_success) === 'true');
  }

  //------------------------------------------------------------
  //                       Payloads
  //------------------------------------------------------------
  if (body.cap_serial && validator.isAlphanumeric(String(body.cap_serial))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.cap_serial`] = String(body.cap_serial);
  }
  if (body.payload_mass_kg && validator.isNumeric(String(body.payload_mass_kg))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.payload_mass_kg`] = parseFloat(body.payload_mass_kg);
  }
  if (body.payload_mass_lbs && validator.isNumeric(String(body.payload_mass_lbs))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.payload_mass_lbs`] = parseFloat(body.payload_mass_lbs);
  }
  if (body.payload_id && validator.isAlphanumeric(String(body.payload_id))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.payload_id`] = String(body.payload_id);
  }
  if (body.payload_type && validator.isAlphanumeric(String(body.payload_type))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.payload_type`] = String(body.payload_type);
  }
  if (body.norad_id && validator.isNumeric(String(body.norad_id))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.norad_id`] = parseInt(body.norad_id, 10);
  }
  if (body.payload_reused && validator.isBoolean(String(body.payload_reused))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.reused`] = (String(body.payload_reused) === 'true');
  }
  if (body.customer && validator.isAlphanumeric(String(body.customer))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.customers`] = String(body.customer);
  }
  if (body.nationality && validator.isAlphanumeric(String(body.nationality))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.nationality`] = String(body.nationality);
  }
  if (body.manufacturer && validator.isAlphanumeric(String(body.manufacturer))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.manufacturer`] = String(body.manufacturer);
  }
  if (body.payload_type && validator.isAlphanumeric(String(body.payload_type))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.payload_type`] = String(body.payload_type);
  }
  if (body.orbit && validator.isAlphanumeric(String(body.orbit))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.orbit`] = String(body.orbit);
  }
  if (body.payload_reference_system && validator.isAlphanumeric(String(body.payload_reference_system))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.orbit_params.reference_system`] = String(body.payload_reference_system);
  }
  if (body.payload_regime && validator.isAlphanumeric(String(body.payload_regime))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.orbit_params.regime`] = String(body.payload_regime);
  }
  if (body.payload_lifespan_years && validator.isNumeric(String(body.payload_lifespan_years))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.orbit_params.lifespan_years`] = parseInt(body.payload_lifespan_years, 10);
  }
  if (body.payload_longitude && validator.isNumeric(String(body.payload_longitude))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.orbit_params.longitude`] = parseInt(body.payload_longitude, 10);
  }
  if (body.dragon_mass_returned_kg && validator.isNumeric(String(body.dragon_mass_returned_kg))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.mass_returned_kg`] = parseFloat(body.dragon_mass_returned_kg);
  }
  if (body.dragon_mass_returned_lbs && validator.isNumeric(String(body.dragon_mass_returned_lbs))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.mass_returned_lbs`] = parseFloat(body.dragon_mass_returned_lbs);
  }
  if (body.dragon_flight_time_sec && validator.isInt(String(body.dragon_flight_time_sec))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.flight_time_sec`] = parseInt(body.dragon_flight_time_sec, 10);
  }
  if (body.cargo_manifest && validator.isAlphanumeric(String(body.cargo_manifest))) {
    query.$set[`rocket.second_stage.payloads.${payload_index}.cargo_manifest`] = String(body.cargo_manifest);
  }

  //------------------------------------------------------------
  //                       Links
  //------------------------------------------------------------
  if (body.mission_patch && validator.isURL(String(body.mission_patch))) {
    query.$set.links.mission_patch = String(body.mission_patch);
  }
  if (body.mission_patch_small && validator.isURL(String(body.mission_patch_small))) {
    query.$set.links.mission_patch_small = String(body.mission_patch_small);
  }
  if (body.reddit_campaign && validator.isURL(String(body.reddit_campaign))) {
    query.$set.links.reddit_campaign = String(body.reddit_campaign);
  }
  if (body.reddit_launch && validator.isURL(String(body.reddit_launch))) {
    query.$set.links.reddit_launch = String(body.reddit_launch);
  }
  if (body.reddit_recovery && validator.isURL(String(body.reddit_recovery))) {
    query.$set.links.reddit_recovery = String(body.reddit_recovery);
  }
  if (body.reddit_media && validator.isURL(String(body.reddit_media))) {
    query.$set.links.reddit_media = String(body.reddit_media);
  }
  if (body.presskit && validator.isURL(String(body.presskit))) {
    query.$set.links.presskit = String(body.presskit);
  }
  if (body.article_link && validator.isURL(String(body.article_link))) {
    query.$set.links.article_link = String(body.article_link);
  }
  if (body.wikipedia && validator.isURL(String(body.wikipedia))) {
    query.$set.links.wikipedia = String(body.wikipedia);
  }
  if (body.video_link && validator.isURL(String(body.video_link))) {
    query.$set.links.video_link = String(body.video_link);
  }

  //------------------------------------------------------------
  //             Details, Static Fire, and Upcoming
  //------------------------------------------------------------
  if (body.details && validator.isAlphanumeric(String(body.details))) {
    query.$set.details = String(body.details);
  }
  if (body.static_fire_date_utc && validator.isISO8601(String(body.static_fire_date_utc))) {
    query.$set.static_fire_date_utc = String(body.static_fire_date_utc);
  }
  if (body.upcoming && validator.isBoolean(String(body.upcoming))) {
    query.$set.upcoming = (String(body.upcoming) === 'true');
  }

  return query;
};
