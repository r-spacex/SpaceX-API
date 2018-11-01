/*eslint-disable */
const resolvers = {
  Query: {
    capsules: async (obj, args, { db }) => {
      const data = await db
        .collection('capsule')
        .find()
        // .find(find(ctx.request))
        // .project(project(ctx.request.query))
        // .sort(sort(ctx.request))
        // .limit(limit(ctx.request.query))
        .toArray()
      return data
    },
    capsule: async (obj, { capsule_serial }, { db }) => {
      const data = await db
        .collection('capsule')
        .find({ capsule_serial })
        // .project(project(ctx.request.query))
        .toArray()
      return data[0]
    }
  }
}

module.exports = resolvers
