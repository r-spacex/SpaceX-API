/*eslint-disable */
const { typeDefs: global } = require('./global')
const { typeDefs: capsule } = require('./capsule')
const { typeDefs: core } = require('./core')
const { typeDefs: dragon } = require('./dragon')

const typeDefs = [...global, capsule, core, dragon]

module.exports = typeDefs
