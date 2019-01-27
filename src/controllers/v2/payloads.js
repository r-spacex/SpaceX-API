
const find = require('../../lib/query-builder/v2/find');
const sort = require('../../lib/query-builder/v2/sort');
const limit = require('../../lib/query-builder/v2/limit');

module.exports = {

  /**
   * Returns all payloads
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('launch')
      .find(find(ctx.request))
      .project({ _id: 0, 'rocket.second_stage.payloads': 1, flight_number: 1 })
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();

    delete ctx.request.query.limit;
    delete ctx.request.query.order;
    delete ctx.request.query.sort;
    const { pretty } = ctx.request.query;
    delete ctx.request.query.pretty;

    const payloads = [];
    let match;
    data.forEach((launch) => {
      launch.rocket.second_stage.payloads.forEach((payload) => {
        match = 0;
        if (Object.keys(ctx.request.query).length !== 0) {
          Object.entries(ctx.request.query).forEach(([key, value]) => {
            if (value === payload[key]) {
              match += 1;
            }
          });
          if (match === Object.keys(ctx.request.query).length) {
            payloads.push(payload);
          }
        } else {
          payloads.push(payload);
        }
      });
    });
    ctx.request.query.pretty = pretty;
    ctx.body = payloads;
  },

  /**
   * Returns single payload
   */
  one: async (ctx) => {
    let payloads;
    const data = await global.db
      .collection('launch')
      .find({ 'rocket.second_stage.payloads.payload_id': ctx.params.payload_id })
      .project({ _id: 0, 'rocket.second_stage.payloads': 1, flight_number: 1 })
      .limit(limit(ctx.request.query))
      .toArray();
    try {
      ({ payloads } = data[0].rocket.second_stage);
      let index = 0;
      payloads.forEach((payload, i) => {
        if (payload.payload_id === ctx.params.payload_id) {
          index = i;
        }
      });
      ctx.body = payloads[index];
    } catch (err) {
      console.log(err);
      ctx.body = data;
    }
  },
};
