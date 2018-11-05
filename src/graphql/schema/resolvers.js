/*eslint-disable */
const merge = require('lodash/merge')
const { resolvers: capsule } = require('./capsule')
const { resolvers: core } = require('./core')
const { resolvers: dragon } = require('./dragon')

const resolvers = merge(capsule, core, dragon)

module.exports = resolvers
