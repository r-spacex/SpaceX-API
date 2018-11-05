/*eslint-disable */
const { gql } = require('apollo-server')

const spaceX = gql`
  type Thrust {
    kN: Float
    lbf: Float
  }

  type Mass {
    kg: Int
    lb: Int
  }

  type Volume {
    cubic_meters: Int
    cubic_feet: Int
  }

  type Distance {
    meters: Float
    feet: Float
  }

  type Link {
    reddit: String
    article: String
    wikipedia: String
  }

  type Address {
    address: String
    city: String
    state: String
  }
`

module.exports = {
  spaceX
}
