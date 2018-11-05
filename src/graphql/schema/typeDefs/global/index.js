/*eslint-disable */
const { Query } = require('./entryPoints')
const { scalars } = require('./scalars')
const { spaceX } = require('./spaceX')

const global = [Query, scalars, spaceX]

module.exports = global
