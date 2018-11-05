/*eslint-disable */
const { typeDefs: global } = require('./global')
const { typeDefs: capsule } = require('./capsule')
const { typeDefs: core } = require('./core')

const typeDefs = [...global, capsule, core]

module.exports = typeDefs
