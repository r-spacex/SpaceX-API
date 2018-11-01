/*eslint-disable */
const { gql } = require('apollo-server')

const Scalars = gql`
  scalar Date
`
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

const globals = [Scalars, Query, Mutation, Subscription]

const typeDefs = [...globals]

module.exports = typeDefs
