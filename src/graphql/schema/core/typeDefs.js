/*eslint-disable */
const { gql } = require('apollo-server')

const typeDefs = gql`
  extend type Query {
    cores: [Core]
    core(core_serial: String!): Core
  }

  type Core {
    core_serial: String
    block: Int
    status: String
    original_launch: Date
    missions: [Mission]
    reuse_count: Int
    rtls_attempts: Int
    rtls_landings: Int
    asds_attempts: Int
    asds_landings: Int
    water_landing: Boolean
  }
`
module.exports = typeDefs
