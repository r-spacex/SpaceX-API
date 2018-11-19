/*eslint-disable */
const collection = 'launch'
const url = `/v3/launches`
const resolvers = {
  Query: {
    launches: async (obj, { find, order, sort, limit, id }, context) => {
      const data = await context.db
        .collection(collection)
        .find(context.find({ query: { ...find }, url }))
        .project(context.project({ id }))
        .sort(context.sort({ query: { order, sort }, url }))
        .limit(context.limit({ limit }))
        .map(parseLaunch)
        .toArray()

      return data
    },
    launchesPast: async (obj, { find, order, sort, limit, id }, context) => {
      const data = await context.db
        .collection(collection)
        .find({ upcoming: false, ...context.find({ query: { ...find }, url }) })
        .project(context.project({ id }))
        .sort(context.sort({ query: { order, sort }, url }))
        .limit(context.limit({ limit }))
        .map(parseLaunch)
        .toArray()

      return data
    },
    launchesUpcoming: async (
      obj,
      { find, order, sort, limit, id },
      context
    ) => {
      const data = await context.db
        .collection(collection)
        .find({ upcoming: true, ...context.find({ query: { ...find }, url }) })
        .project(context.project({ id }))
        .sort(context.sort({ query: { order, sort }, url }))
        .limit(context.limit({ limit }))
        .map(parseLaunch)
        .toArray()

      return data
    },
    launch: async (obj, { flight_number, id }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ flight_number })
        .project(context.project({ id }))
        .map(parseLaunch)
        .toArray()

      return data
    },
    launchLatest: async (obj, { id }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ upcoming: false })
        .project(context.project({ id }))
        .sort({ flight_number: -1 })
        .limit(1)
        .map(parseLaunch)
        .toArray()

      return data
    },
    launchNext: async (obj, { flight_number, id }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ upcoming: true })
        .project(context.project({ id }))
        .sort({ flight_number: -1 })
        .limit(1)
        .map(parseLaunch)
        .toArray()

      return data
    }
  },
  LaunchRocket: {
    rocket: async ({ rocket_id }, args, context) => {
      const [data] = await context.db
        .collection('rocket')
        .find({ id: rocket_id })
        .project(context.project({ id: true }))
        .map(parseRocket)
        .toArray()
      return data
    }
  },
  LaunchRocketFirstStageCore: {
    core: async ({ core_serial }, args, context) => {
      const [data] = await context.db
        .collection('core')
        .find({ core_serial })
        .project(context.project({ id: true }))
        .toArray()
      return data
    }
  },
  History: {
    flight: async ({ flight_number }, args, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ flight_number })
        .project(context.project({ id: true }))
        .toArray()
      return data
    }
  }
}

const parseLaunch = ({ reuse, ...parsedLaunch }) => parsedLaunch

const parseRocket = rocket => {
  rocket.rocket_id = rocket.id
  rocket.id = rocket.rocketid
  rocket.rocket_name = rocket.name
  rocket.rocket_type = rocket.type
  const { rocketid, name, type, ...parsedRocket } = rocket
  return parsedRocket
}

module.exports = resolvers
