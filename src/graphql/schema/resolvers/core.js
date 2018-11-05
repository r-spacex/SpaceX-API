/*eslint-disable */
const collection = 'core'
const url = `/v3/cores`
const resolvers = {
  Query: {
    cores: async (obj, { find, id, order, sort, limit }, context) => {
      const data = await context.db
        .collection(collection)
        .find(context.find({ query: { ...find }, url }))
        .project(context.project({ id }))
        .sort(context.sort({ query: { order, sort }, url }))
        .limit(context.limit({ limit }))
        .toArray()
      return data
    },
    core: async (obj, { core_serial }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ core_serial })
        .project(context.project({ id }))
        .toArray()
      return data
    }
  }
}

module.exports = resolvers
