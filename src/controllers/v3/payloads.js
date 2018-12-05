
const find = require('../../builders/v3/find');
const limit = require('../../builders/v3/limit');
const offset = require('../../builders/v3/offset');
const sort = require('../../builders/v3/sort');

module.exports = {

  /**
   * Returns all payloads
   */
  all: async ctx => {
    const data = await global.db
      .collection('launch')
      .find(find(ctx.request))
      .project({ _id: 0, 'rocket.second_stage.payloads': 1, flight_number: 1 })
      .sort(sort(ctx.request))
      .skip(offset(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();

    // Removed these fields so we can match the remaining querystrings against
    // each payload
    delete ctx.request.query.limit;
    delete ctx.request.query.offset;
    delete ctx.request.query.order;
    delete ctx.request.query.sort;
    delete ctx.request.query.filter;

    // Pretty is stored because the json formatter reads this after the request, and
    // we need to get rid of querystrings not found in a payload object
    const { pretty } = ctx.request.query;
    delete ctx.request.query.pretty;

    const payloads = [];
    let match;
    data.forEach(launch => {
      launch.rocket.second_stage.payloads.forEach(payload => {
        match = 0;
        // Match each payload object with the given querystrings
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
  one: async ctx => {
    let payloads;
    const data = await global.db
      .collection('launch')
      .find({ 'rocket.second_stage.payloads.payload_id': ctx.params.payload_id })
      .project({ _id: 0, 'rocket.second_stage.payloads': 1, flight_number: 1 })
      .limit(1)
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    // Because the query could return a launch with multiple payloads, we iterate
    // through the object to find the matching payload
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
