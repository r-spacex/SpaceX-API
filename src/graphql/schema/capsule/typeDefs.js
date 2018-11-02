/*eslint-disable */
const { gql } = require('apollo-server')

const typeDefs = gql`
  extend type Query {
    capsules(
      find: String
      id: Boolean
      limit: Int
      order: String
      sort: String
    ): [Capsule]
    capsule(capsule_serial: String!, id: Boolean): Capsule
  }

  type Capsule {
    _id: ObjectID
    capsule_serial: String
    capsule_id: String
    status: String
    original_launch: Date
    missions: [Mission]
    landings: Int
    type: String
    reuse_count: Int
  }

  type Mission {
    name: String
    flight: Int
  }
`

module.exports = typeDefs
