
const limit = require('../builders/limit');
const project = require('../builders/project');

module.exports = {

  /**
   * Returns all rocket info
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('rocket')
      .find({})
      .project(project(ctx.request.query))
      .sort({ first_flight: 1 })
      .limit(limit(ctx.request.query))
      .toArray();
    data.forEach((rocket) => {
      rocket.id = rocket.rocketid;
      rocket.rocket_id = rocket.id;
      rocket.rocket_name = rocket.name;
      rocket.rocket_type = rocket.type;
      delete rocket.rocketid;
      delete rocket.id;
      delete rocket.name;
      delete rocket.type;
    });
    ctx.body = data;
  },

  /**
   * Returns specific rocket info
   */
  specific: async (ctx) => {
    const data = await global.db
      .collection('rocket')
      .find({ id: ctx.params.rocket })
      .project(project(ctx.request.query))
      .toArray();
    data[0].id = data[0].rocketid;
    data[0].rocket_id = data[0].id;
    data[0].rocket_name = data[0].name;
    data[0].rocket_type = data[0].type;
    delete data[0].rocketid;
    delete data[0].id;
    delete data[0].name;
    delete data[0].type;
    ctx.body = data[0];
  },

};
