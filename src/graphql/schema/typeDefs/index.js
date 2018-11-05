/*eslint-disable */
const global = require('./global')
const capsule = require('./capsule')
const core = require('./core')
const dragon = require('./dragon')

const typeDefs = [...global, capsule, core, dragon]

module.exports = typeDefs
