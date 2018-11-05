/*eslint-disable */
const { gql } = require('apollo-server')

const spaceX = gql`
  type Thrust {
    kN: Float
    lbf: Float
  }

  type PayloadMass {
    kg: Int
    lb: Int
  }

  type PayloadVol {
    cubic_meters: Int
    cubic_feet: Int
  }

  type Distance {
    meters: Float
    feet: Float
  }
`

module.exports = {
  spaceX
}
