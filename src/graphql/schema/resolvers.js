/*eslint-disable */
const merge = require('lodash/merge')
const { resolvers: capsule } = require('./capsule')
const { resolvers: core } = require('./core')

const resolvers = merge(capsule, core)

module.exports = resolvers
