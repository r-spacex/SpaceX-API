/*eslint-disable */
const { gql } = require('apollo-server')

const typeDefs = gql`
  extend type Query {
    launchpads(id: Boolean, limit: Int): [Launchpad]
    launchpad(pad: String!, id: Boolean): Launchpad
  }

  type Launchpad {
    _id: ObjectID
    id: Int
    status: String
    location: Location
    vehicles_launched: [Rocket]
    attempted_launches: Int
    successful_launches: Int
    wikipedia: String
    details: String
    site_id: String
    site_name_long: String
  }
`
module.exports = typeDefs
