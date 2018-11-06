/*eslint-disable */
const { gql } = require('apollo-server')

const typeDefs = gql`
  extend type Query {
    rockets(id: Boolean, limit: Int): [Rocket]
    rocket(rocket: String!, id: Boolean): Rocket
  }

  type Rocket {
    _id: ObjectID
    id: Int
    active: Boolean
    stages: Int
    boosters: Int
    cost_per_launch: Int
    success_rate_pct: Int
    first_flight: Date
    country: String
    company: String
    height: Distance
    diameter: Distance
    mass: Mass
    payload_weights: RocketPayloadWeight
    first_stage: RocketFirstStage
    second_stage: RocketSecondStage
    engines: RocketEngines
    landing_legs: RocketLandingLegs
    wikipedia: String
    description: String
    rocket_id: String
    rocket_name: String
    rocket_type: String
  }

  type RocketPayloadWeight {
    id: String
    name: String
    kg: Int
    lb: Int
  }

  type RocketFirstStage {
    reusable: Boolean
    engines: Int
    fuel_amount_tons: Float
    burn_time_sec: Int
    thrust_sea_level: Force
    thrust_vacuum: Force
  }

  type RocketSecondStage {
    engines: Int
    fuel_amount_tons: Float
    burn_time_sec: Int
    thrust: Force
    payloads: RocketSecondStagePayloads
  }

  type RocketSecondStagePayloads {
    option_1: String
    composite_fairing: RocketSecondStagePayloadCompositeFairing
  }

  type RocketSecondStagePayloadCompositeFairing {
    height: Distance
    diameter: Distance
  }

  type RocketEngines {
    number: Int
    type: String
    version: String
    layout: String
    engine_loss_max: String
    propellant_1: String
    propellant_2: String
    thrust_sea_level: Force
    thrust_vacuum: Force
    thrust_to_weight: Int
  }

  type RocketLandingLegs {
    number: Int
    material: String
  }
`

module.exports = typeDefs
