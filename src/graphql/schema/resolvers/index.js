/*eslint-disable */
const merge = require('lodash/merge')
const capsule = require('./capsule')
const core = require('./core')
const dragon = require('./dragon')

const resolvers = merge(capsule, core, dragon)

module.exports = resolvers
