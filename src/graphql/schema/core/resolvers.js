/*eslint-disable */
const resolvers = {
  Query: {
    cores: async (obj, args, { db }) => {
      const data = await db
        .collection('core')
        .find()
        // .find(find(ctx.request))
        // .project(project(ctx.request.query))
        // .sort(sort(ctx.request))
        // .limit(limit(ctx.request.query))
        .toArray()
      return data
    },
    core: async (obj, { core_serial }, { db }) => {
      const data = await db
        .collection('core')
        .find({ core_serial })
        // .project(project(ctx.request.query))
        .toArray()
      return data[0]
    }
  }
}

module.exports = resolvers
