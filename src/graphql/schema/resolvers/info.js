/*eslint-disable */
const collection = 'info'
const resolvers = {
  Query: {
    info: async (obj, { id }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({})
        .project(context.project({ id }))
        .toArray()
      return data
    },
    api: async (obj, args, context) => {
      const [data] = await context.db
        .collection('home')
        .find({})
        .project({ _id: 0 })
        .toArray()
      return data
    }
  }
}

module.exports = resolvers
