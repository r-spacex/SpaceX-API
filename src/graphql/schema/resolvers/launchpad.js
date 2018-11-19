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
        .map(parseLaunchpad)
        .toArray()
      return data
    },
    launchpad: async (obj, { pad, id }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ id: pad })
        .project(context.project({ id }))
        .map(parseLaunchpad)
        .toArray()
      return data
    }
  },
  Launchpad: {
    vehicles_launched: async ({ vehicles_launched }, args, context) => {
      return vehicles_launched.map(async name => {
        const [data] = await context.db
          .collection('rocket')
          .find({ name })
          .project(context.project({ id: true }))
          .map(parseRocket)
          .toArray()
        return data
      })
    }
  }
}

const parseLaunchpad = pad => {
  pad.site_id = pad.id
  pad.id = pad.padid
  pad.site_name_long = pad.full_name
  const { padid, full_name, ...padParsed } = pad
  return padParsed
}

const parseRocket = rocket => {
  rocket.rocket_id = rocket.id
  rocket.id = rocket.rocketid
  rocket.rocket_name = rocket.name
  rocket.rocket_type = rocket.type
  const { rocketid, name, type, ...rocketParsed } = rocket
  return rocketParsed
}

module.exports = resolvers
