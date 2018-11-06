/*eslint-disable */
const collection = 'ship'
const url = `/v3/ships`
const resolvers = {
  Query: {
    ships: async (obj, { find, id, order, sort, limit }, context) => {
      const data = await context.db
        .collection(collection)
        .find(context.find({ query: { ...find }, url }))
        .project(context.project({ id }))
        .sort(context.sort({ query: { order, sort }, url }))
        .limit(context.limit({ limit }))
        .toArray()
      return data
    },
    ship: async (obj, { ship_id, id }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ ship_id })
        .project(context.project({ id }))
        .toArray()
      return data
    }
  }
}

module.exports = resolvers
