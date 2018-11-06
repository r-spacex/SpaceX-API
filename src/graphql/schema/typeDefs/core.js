/*eslint-disable */
const { gql } = require('apollo-server')

const typeDefs = gql`
  extend type Query {
    cores(
      find: CoresFind
      id: Boolean
      limit: Int
      order: String
      sort: String
    ): [Core]
    core(core_serial: String!, id: Boolean): Core
  }

  input CoresFind {
    core_serial: String
    block: Int
    status: String
    original_launch: Date
    missions: String
    reuse_count: Int
    rtls_attempts: Int
    rtls_landings: Int
    asds_attempts: Int
    asds_landings: Int
    water_landing: Boolean
  }

  type Core {
    _id: ObjectID
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
