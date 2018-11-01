/*eslint-disable */
const { makeExecutableSchema } = require('apollo-server')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = schema
