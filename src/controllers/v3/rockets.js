
const limit = require('../../builders/v3/limit');
const offset = require('../../builders/v3/offset');
const project = require('../../builders/v3/project');

module.exports = {

  /**
   * Returns all rocket info
   */
  all: async ctx => {
    const data = await global.db
      .collection('rocket')
      .find({})
      .project(project(ctx.request.query))
      .sort({ first_flight: 1 })
      .skip(offset(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();
    data.forEach(rocket => {
      rocket.rocket_id = rocket.id;
      rocket.id = rocket.rocketid;
      rocket.rocket_name = rocket.name;
      rocket.rocket_type = rocket.type;
      delete rocket.rocketid;
      delete rocket.name;
      delete rocket.type;
    });
    ctx.body = data;
  },

  /**
   * Returns specific rocket info
   */
  specific: async ctx => {
    const data = await global.db
      .collection('rocket')
      .find({ id: ctx.params.rocket })
      .project(project(ctx.request.query))
      .limit(1)
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    data[0].rocket_id = data[0].id;
    data[0].id = data[0].rocketid;
    data[0].rocket_name = data[0].name;
    data[0].rocket_type = data[0].type;
    delete data[0].rocketid;
    delete data[0].name;
    delete data[0].type;
    ctx.body = data[0];
  },

};
