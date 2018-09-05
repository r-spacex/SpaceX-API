
const launchQuery = require('../../builders/query/launch-query');
const sort = require('../../builders/sort/v3-sort');
const limit = require('../../builders/limit');

module.exports = {

  /**
   * Returns all payloads
   */
  all: async ctx => {
    const data = await global.db
      .collection('launch')
      .find(launchQuery(ctx.request.query))
      .project({ _id: 0, 'rocket.second_stage.payloads': 1, flight_number: 1 })
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();

    // Remove params that aren't fields, so we can iterate them and check if the
    // payload fields match
    delete ctx.request.query.limit;
    delete ctx.request.query.order;
    delete ctx.request.query.sort;
    // Store pretty value so json formatter can check param at the request end
    const pretty = ctx.request.query.pretty;
    delete ctx.request.query.pretty;

    const payloads = [];
    let match;
    data.forEach(launch => {
      launch.rocket.second_stage.payloads.forEach(payload => {
        match = 0;
        // Iterate keys in querystring object, and check if the payload object
        // is equal. If they match, add to match counter. At the end, check that the
        // number of matches equals the number of keys in the querystring object, and if so,
        // push the payload object to the array
        if (Object.keys(ctx.request.query).length !== 0) {
          Object.entries(ctx.request.query).forEach(([key, value]) => {
            if (value === payload[key]) {
              match += 1;
            }
          });
          if (match === Object.keys(ctx.request.query).length) {
            payloads.push(payload);
          }
        // If no querystrings exist, we don't need to check matching, so add the payload
        } else {
          payloads.push(payload);
        }
      });
    });
    // Add back pretty variable, so json formatter can tell whether or not to pretty print
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
      .limit(limit(ctx.request.query))
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    try {
      payloads = data[0].rocket.second_stage.payloads;
      let index = 0;
      // Check that the payload_id matches the one in the param. If it matches
      // return the index of that payload
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
