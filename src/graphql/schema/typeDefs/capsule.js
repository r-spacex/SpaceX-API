/*eslint-disable */
const { gql } = require('apollo-server')

const typeDefs = gql`
  extend type Query {
    capsules(
      find: CapsulesFind
      id: Boolean
      limit: Int
      order: String
      sort: String
    ): [Capsule]
    capsule(capsule_serial: String!, id: Boolean): Capsule
  }

  input CapsulesFind {
    capsule_serial: String
    capsule_id: String
    status: String
    original_launch: Date
    mission: String
    landings: Int
    type: String
    reuse_count: Int
  }

  type Capsule {
    _id: ObjectID
    capsule_serial: String
    capsule_id: String
    status: String
    original_launch: Date
    missions: [CapsuleMission]
    landings: Int
    type: String
    reuse_count: Int
  }

  type CapsuleMission {
    name: String
    flight: Int
  }
`

module.exports = typeDefs
