/*eslint-disable */
const collection = 'rocket'

const resolvers = {
  Query: {
    rockets: async (obj, { id, limit }, context) => {
      const data = await context.db
        .collection(collection)
        .find({})
        .project(context.project({ id }))
        .sort({ first_flight: 1 })
        .limit(context.limit({ limit }))
        .map(parseLaunchpads)
        .toArray()
      return data
    },
    rocket: async (obj, { rocket, id }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ id: rocket })
        .project(context.project({ id }))
        .map(parseLaunchpads)
        .toArray()
      return data
    }
  }
}

const parseLaunchpads = rocket => {
  rocket.rocket_id = rocket.id
  rocket.id = rocket.rocketid
  rocket.rocket_name = rocket.name
  rocket.rocket_type = rocket.type
  delete rocket.rocketid
  delete rocket.name
  delete rocket.type
  return rocket
}

module.exports = resolvers
