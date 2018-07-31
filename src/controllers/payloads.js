
const launchQuery = require('../builders/launch-query');
const sortQuery = require('../builders/launch-sort');
const limitQuery = require('../builders/limit-query');

module.exports = {

  /**
   * Returns all payloads
   */
  all: async (ctx) => {
    let data;
    const past = await global.db
      .collection('launch_v2')
      .find(launchQuery(ctx.request))
      .project({ _id: 0, 'rocket.second_stage.payloads': 1, flight_number: 1 })
      .sort(sortQuery(ctx.request))
      .limit(limitQuery(ctx.request))
      .toArray();
    const upcoming = await global.db
      .collection('upcoming_v2')
      .find(launchQuery(ctx.request))
      .project({ _id: 0, 'rocket.second_stage.payloads': 1, flight_number: 1 })
      .sort(sortQuery(ctx.request))
      .limit(limitQuery(ctx.request))
      .toArray();
    if (past.length !== 0 && past[past.length - 1].flight_number === 1) {
      data = upcoming.concat(past);
    } else {
      data = past.concat(upcoming);
    }
    const payloads = [];
    data.forEach((launch) => {
      launch.rocket.second_stage.payloads.forEach((payload) => {
        payloads.push(payload);
      });
    });
    ctx.body = payloads;
  },

  /**
   * Returns single payload
   */
  one: async (ctx) => {
    let payloads;
    const past = await global.db
      .collection('launch_v2')
      .find({ 'rocket.second_stage.payloads.payload_id': ctx.params.payload_id })
      .project({ _id: 0, 'rocket.second_stage.payloads': 1, flight_number: 1 })
      .sort(sortQuery(ctx.request))
      .limit(limitQuery(ctx.request))
      .toArray();
    const upcoming = await global.db
      .collection('upcoming_v2')
      .find({ 'rocket.second_stage.payloads.payload_id': ctx.params.payload_id })
      .project({ _id: 0, 'rocket.second_stage.payloads': 1, flight_number: 1 })
      .toArray();
    const data = past.concat(upcoming);
    try {
      payloads = data[0].rocket.second_stage.payloads;
      let index = 0;
      payloads.forEach((payload, i) => {
        if (payload.payload_id === ctx.params.payload_id) {
          index = i;
        }
      });
      // Allow because index can only be number
      // eslint-disable-next-line security/detect-object-injection
      ctx.body = payloads[index];
    } catch (err) {
      console.log(err);
      ctx.body = data;
    }
  },
};
