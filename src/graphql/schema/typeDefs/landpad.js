/*eslint-disable */
const { gql } = require('apollo-server')

const typeDefs = gql`
  extend type Query {
    landpads(id: Boolean, limit: Int): [Landpad]
    landpad(landpad_id: String!, id: Boolean): Landpad
  }

  type Landpad {
    _id: ObjectID
    id: String
    full_name: String
    status: String
    location: Location
    landing_type: String
    attempted_landings: String
    successful_landings: String
    wikipedia: String
    details: String
  }
`

module.exports = typeDefs
