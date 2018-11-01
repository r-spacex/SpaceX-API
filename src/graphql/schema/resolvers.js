/*eslint-disable */
const merge = require('lodash/merge')
const { resolvers: capsule } = require('./capsule')

const resolvers = merge(capsule)

module.exports = resolvers
