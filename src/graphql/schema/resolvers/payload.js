/*eslint-disable */
const collection = 'launch'
const url = `/v3/payloads`
const resolvers = {
  Query: {
    payloads: async (obj, { find, order, sort, limit }, context) => {
      const data = await context.db
        .collection(collection)
        .find(context.find({ query: { ...find }, url }))
        .project({
          _id: 0,
          'rocket.second_stage.payloads': 1,
          flight_number: 1
        })
        .sort(context.sort({ query: { order, sort }, url }))
        .limit(context.limit({ limit }))
        .toArray()

      return parsePayloads(data, { ...find })
    },
    payload: async (obj, { payload_id, limit }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ 'rocket.second_stage.payloads.payload_id': payload_id })
        .project({
          _id: 0,
          'rocket.second_stage.payloads': 1,
          flight_number: 1
        })
        .limit(context.limit({ limit }))
        .toArray()

      return parsePayload(data)
    }
  },
  Mission: {
    payloads: async ({ payload_ids }, args, context) => {
      return payload_ids.map(async payload_id => {
        const [data] = await context.db
          .collection(collection)
          .find({ 'rocket.second_stage.payloads.payload_id': payload_id })
          .project({
            _id: 1,
            'rocket.second_stage.payloads': 1,
            flight_number: 1
          })
          .toArray()

        return parsePayload(data)
      })
    }
  }
}

// TOCHECK
const parsePayloads = (data, query) => {
  const payloads = []
  let match
  data.forEach(launch => {
    launch.rocket.second_stage.payloads.forEach(payload => {
      match = 0
      if (Object.keys(query).length !== 0) {
        Object.entries(query).forEach(([key, value]) => {
          if (value === payload[key]) {
            match += 1
          }
        })
        if (match === Object.keys(query).length) {
          payloads.push(payload)
        }
      } else {
        payloads.push(payload)
      }
    })
  })
  return payloads
}

// TOCHECK
const parsePayload = (payload, payload_id) => {
  if (!payload) return null
  const { payloads } = payload.rocket.second_stage
  let index = 0
  payloads.forEach((payload, i) => {
    if (payload.payload_id === payload_id) {
      index = i
    }
  })
  return payloads[index]
}

module.exports = resolvers
