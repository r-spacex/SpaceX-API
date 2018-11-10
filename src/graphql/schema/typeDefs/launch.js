/*eslint-disable */
const { gql } = require('apollo-server')

const typeDefs = gql`
  extend type Query {
    launches(
      find: LaunchFind
      id: Boolean
      limit: Int
      order: String
      sort: String
    ): [Launch]
    launchesPast(
      find: LaunchFind
      id: Boolean
      limit: Int
      order: String
      sort: String
    ): [Launch]
    launchesUpcoming(
      find: LaunchFind
      id: Boolean
      limit: Int
      order: String
      sort: String
    ): [Launch]
    launch(flight_number: Int!, id: Boolean): Launch
    launchLatest(id: Boolean): Launch
    launchNext(id: Boolean): Launch
  }

  type Launch {
    _id: ObjectID
    flight_number: Int
    mission_name: String
    mission_id: [String]
    upcoming: Boolean
    launch_year: String
    launch_date_unix: Date
    launch_date_utc: Date
    launch_date_local: Date
    is_tentative: Boolean
    tentative_max_precision: String
    rocket: LaunchRocket
    ships: [String]
    telemetry: LaunchTelemetry
    launch_site: LaunchSite
    launch_success: Boolean
    links: LaunchLinks
    details: String
    static_fire_date_utc: Date
    static_fire_date_unix: Date
  }

  extend type History {
    flight: Launch
  }

  type LaunchRocket {
    rocket: Rocket
    rocket_name: String
    rocket_type: String
    first_stage: LaunchRocketFirstStage
    second_stage: LaunchRocketSecondStage
    fairings: LaunchRocketFairings
  }

  type LaunchRocketFirstStage {
    cores: [LaunchRocketFirstStageCore]
  }

  type LaunchRocketFirstStageCore {
    core: Core
    flight: Int
    block: Int
    gridfins: Boolean
    legs: Boolean
    reused: Boolean
    land_success: Boolean
    landing_intent: Boolean
    landing_type: String
    landing_vehicle: Boolean
  }
  type LaunchRocketSecondStage {
    block: Int
    payloads: [Payload]
  }

  type LaunchRocketFairings {
    reused: Boolean
    recovery_attempt: Boolean
    recovered: Boolean
    ship: String
  }

  type LaunchTelemetry {
    flight_club: String
  }

  type LaunchSite {
    site_id: String
    site_name: String
    site_name_long: String
  }

  type LaunchLinks {
    mission_patch: String
    mission_patch_small: String
    reddit_campaign: String
    reddit_launch: String
    reddit_recovery: String
    reddit_media: String
    presskit: String
    article_link: String
    wikipedia: String
    video_link: String
    flickr_images: [String]
  }

  input LaunchFind {
    flight_id: String
    start: Date
    end: Date
    flight_number: Int
    mission_name: String
    mission_id: String
    launch_year: String
    launch_date_utc: Date
    launch_date_local: Date
    tentative: String
    tentative_max_precision: String
    rocket_id: String
    rocket_name: String
    rocket_type: String
    core_serial: String
    cap_serial: String
    core_flight: Int
    block: Int
    gridfins: String
    legs: String
    second_stage_block: String
    fairings_reused: String
    fairings_recovery_attempt: String
    fairings_recovered: String
    fairings_ship: String
    core_reuse: String
    side_core1_reuse: String
    side_core2_reuse: String
    fairings_reuse: String
    capsule_reuse: String
    ship: String
    site_id: String
    site_name: String
    site_name_long: String
    payload_id: String
    norad_id: Int
    customer: String
    nationality: String
    manufacturer: String
    payload_type: String
    orbit: String
    reference_system: String
    regime: String
    longitude: Float
    semi_major_axis_km: Float
    eccentricity: Float
    periapsis_km: Float
    apoapsis_km: Float
    inclination_deg: Float
    period_min: Float
    lifespan_years: Int
    epoch: Date
    mean_motion: Float
    raan: Float
    reused: String
    launch_success: String
    land_success: String
    landing_intent: String
    landing_type: String
    landing_vehicle: String
  }
`
module.exports = typeDefs
