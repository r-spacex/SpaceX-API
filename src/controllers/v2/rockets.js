
const limit = require('../../lib/query-builder/v2/limit');
const project = require('../../lib/query-builder/v2/project');

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
    [ctx.body] = data;
  },

};
