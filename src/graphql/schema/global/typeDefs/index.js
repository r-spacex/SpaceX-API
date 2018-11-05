/*eslint-disable */
const { Query } = require('./entryPoints')
const { scalars } = require('./scalars')
const { spaceX } = require('./spaceX')

module.exports = [Query, scalars, spaceX]
