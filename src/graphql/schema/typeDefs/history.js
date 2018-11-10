/*eslint-disable */
const { gql } = require('apollo-server')

const typeDefs = gql`
  extend type Query {
    histories(
      find: HistoryFind
      id: Boolean
      limit: Int
      order: String
      sort: String
    ): [History]
    history(history_id: Int!, id: Boolean): History
  }

  type History {
    _id: ObjectID
    id: Int
    title: String
    event_date_utc: Date
    event_date_unix: Date
    details: String
    links: [Link]
  }

  input HistoryFind {
    id: Int
    start: Date
    end: Date
    flight_number: Int
  }
`
module.exports = typeDefs
