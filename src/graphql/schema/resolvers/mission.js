/*eslint-disable */
const collection = 'mission'
const url = `/v3/missions`
const resolvers = {
  Query: {
    missions: async (obj, { find, id, limit }, context) => {
      const data = await context.db
        .collection(collection)
        .find(context.find({ query: { ...find }, url }))
        .project(context.project({ id }))
        .limit(context.limit({ limit }))
        .toArray()
      return data
    },
    mission: async (obj, { mission_id, id }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ mission_id })
        .project(context.project({ id }))
        .toArray()
      return data
    }
  }
}

module.exports = resolvers
