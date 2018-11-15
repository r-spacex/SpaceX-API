/*eslint-disable */
const { ApolloServer } = require('apollo-server')
const schema = require('./schema')
const context = require('./context')
const { getDB } = require('./db')

;(async () => {
  const db = await getDB()
  const server = new ApolloServer({ schema, context: { ...context, db } })

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
})()
