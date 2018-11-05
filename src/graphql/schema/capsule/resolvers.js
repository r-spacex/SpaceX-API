/*eslint-disable */
const collection = 'capsule'
const url = `/v3/capsules`
const resolvers = {
  Query: {
    capsules: async (obj, { find, id, order, sort, limit }, context) => {
      const data = await context.db
        .collection(collection)
        .find(context.find({ query: { ...find }, url }))
        .project(context.project({ id }))
        .sort(context.sort({ query: { order, sort }, url }))
        .limit(context.limit({ limit }))
        .toArray()
      return data
    },
    capsule: async (obj, { capsule_serial, id }, context) => {
      const data = await context.db
        .collection(collection)
        .find({ capsule_serial })
        .project(context.project({ id }))
        .toArray()
      return data[0]
    }
  }
}

module.exports = resolvers
