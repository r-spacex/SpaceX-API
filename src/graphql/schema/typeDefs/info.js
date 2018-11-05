/*eslint-disable */
const { gql } = require('apollo-server')

const typeDefs = gql`
  extend type Query {
    info(id: Boolean): Info
    api: Api
  }

  type Info {
    _id: ObjectID
    name: String
    founder: String
    founded: Int
    employees: Int
    vehicles: Int
    launch_sites: Int
    test_sites: Int
    ceo: String
    cto: String
    coo: String
    cto_propulsion: String
    valuation: Int
    headquarters: Address
    summary: String
  }

  type Api {
    project_name: String
    version: String
    project_link: String
    organization: String
    organization_link: String
    description: String
  }
`
module.exports = typeDefs
