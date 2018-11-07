/*eslint-disable */
const collection = 'launchpad'
const resolvers = {
  Query: {
    launchpads: async (obj, { id, limit }, context) => {
      const data = await context.db
        .collection(collection)
        .find({})
        .project(context.project({ id }))
        .limit(context.limit({ limit }))
        .map(parseLaunchpads)
        .toArray()
      return data
    },
    launchpad: async (obj, { pad, id }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ id: pad })
        .project(context.project({ id }))
        .map(parseLaunchpads)
        .toArray()
      return data
    }
  }
}

const parseLaunchpads = pad => {
  pad.site_id = pad.id
  pad.id = pad.padid
  pad.site_name_long = pad.full_name
  const { padid, full_name, ...padParsed } = pad
  return padParsed
}

module.exports = resolvers
