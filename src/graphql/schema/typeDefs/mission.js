/*eslint-disable */
const { gql } = require('apollo-server')

const typeDefs = gql`
  extend type Query {
    missions(find: MissionsFind, id: Boolean, limit: Int): [Mission]
    mission(mission_id: String!, id: Boolean): Mission
  }

  input MissionsFind {
    mission_name: String
    mission_id: String
    manufacturer: String
    payload_id: String
  }

  type Mission {
    _id: ObjectID
    mission_name: String
    mission_id: String
    manufacturers: [String]
    payload_ids: [String]
    wikipedia: String
    website: String
    twitter: String
    description: String
  }
`
module.exports = typeDefs
