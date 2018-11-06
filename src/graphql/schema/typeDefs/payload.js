/*eslint-disable */
const { gql } = require('apollo-server')

const typeDefs = gql`
  extend type Query {
    payloads(
      find: PayloadsFind
      id: Boolean
      limit: Int
      order: String
      sort: String
    ): [Payload]
    payload(payload_id: String!): Payload
  }

  type Payload {
    _id: ObjectID
    payload_id: String
    norad_id: [Int]
    reused: Boolean
    customers: [String]
    nationality: String
    manufacturer: String
    payload_type: String
    payload_mass_kg: Int
    payload_mass_lbs: Int
    orbit: String
    orbit_params: PayloadOrbitParams
  }

  type PayloadOrbitParams {
    reference_system: String
    regime: String
    longitude: Int
    lifespan_years: Int
    epoch: Date
    mean_motion: Float
    raan: Float
    semi_major_axis_km: Float
    eccentricity: Float
    periapsis_km: Float
    apoapsis_km: Float
    inclination_deg: Float
    period_min: Float
    arg_of_pericenter: Float
    mean_anomaly: Float
  }

  input PayloadsFind {
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
    reused: Boolean
  }
`
module.exports = typeDefs
