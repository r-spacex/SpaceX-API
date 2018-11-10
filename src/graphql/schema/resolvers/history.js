/*eslint-disable */
const collection = 'history'
const url = `/v3/history`
const resolvers = {
  Query: {
    histories: async (obj, { find, id, order, sort, limit }, context) => {
      const data = await context.db
        .collection(collection)
        .find(context.find({ query: { ...find }, url }))
        .project(context.project({ id }))
        .sort(context.sort({ query: { order, sort }, url }))
        .limit(context.limit({ limit }))
        .toArray()
      return data
    },
    history: async (obj, { history_id, id }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ id: history_id })
        .project(context.project({ id }))
        .toArray()
      return data
    }
  }
}

module.exports = resolvers
