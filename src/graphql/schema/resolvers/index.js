/*eslint-disable */
const merge = require('lodash/merge')
const capsule = require('./capsule')
const core = require('./core')
const dragon = require('./dragon')
const history = require('./history')
const info = require('./info')
const landpad = require('./landpad')
const launchpad = require('./launchpad')

const resolvers = merge(
  capsule,
  core,
  dragon,
  history,
  info,
  landpad,
  launchpad
)

module.exports = resolvers
