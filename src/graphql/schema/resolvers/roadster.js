/*eslint-disable */
const collection = 'info'
const resolvers = {
  Query: {
    roadster: async (obj, { id }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ name: "Elon Musk's Tesla Roadster" })
        .project(context.project({ id }))
        .toArray()
      return data
    }
  }
}

module.exports = resolvers
