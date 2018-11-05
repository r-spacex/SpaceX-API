/*eslint-disable */
const collection = 'landpad'
const url = `/v3/landpads`
const resolvers = {
  Query: {
    landpads: async (obj, { id, limit }, context) => {
      const data = await context.db
        .collection(collection)
        .find(context.find({}))
        .project(context.project({ id }))
        .limit(context.limit({ limit }))
        .toArray()
      return data
    },
    landpad: async (obj, { landpad_id, id }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ id: landpad_id })
        .project(context.project({ id }))
        .toArray()
      return data
    }
  }
}

module.exports = resolvers
