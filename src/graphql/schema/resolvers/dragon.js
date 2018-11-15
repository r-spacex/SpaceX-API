/*eslint-disable */
const collection = 'dragon'
const url = `/v3/dragons`
const resolvers = {
  Query: {
    dragons: async (obj, { id, limit }, context) => {
      const data = await context.db
        .collection(collection)
        .find({})
        .project(context.project({ id }))
        .limit(context.limit({ limit }))
        .toArray()
      return data
    },
    dragon: async (obj, { capsule, id }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ id: capsule })
        .project(context.project({ id }))
        .toArray()
      return data
    }
  },
  Capsule: {
    capsule: async ({ capsule_id }, args, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ id: capsule_id })
        .project(context.project({ id: true }))
        .toArray()
      return data
    }
  }
}

module.exports = resolvers
