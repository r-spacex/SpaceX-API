/*eslint-disable */
const { gql } = require('apollo-server')

const scalars = gql`
  scalar Date
  scalar ObjectID
`

module.exports = scalars
