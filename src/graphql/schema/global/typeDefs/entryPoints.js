/*eslint-disable */
const { gql } = require('apollo-server')

const Query = gql`
  type Query {
    _empty: String
  }
`
const Mutation = gql`
  type Mutation {
    _empty: String
  }
`
const Subscription = gql`
  type Subscription {
    _empty: String
  }
`

module.exports = {
  Query,
  Mutation,
  Subscription
}
