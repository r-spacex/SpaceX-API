
const limit = require('../../lib/query-builder/v2/limit');
const project = require('../../lib/query-builder/v2/project');

module.exports = {

  /**
   * Returns all Dragon data
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('dragon')
      .find({})
      .project(project(ctx.request.query))
      .sort({ id: 1 })
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Returns specific Dragon data
   */
  specific: async (ctx) => {
    const data = await global.db
      .collection('dragon')
      .find({ id: ctx.params.capsule })
      .project(project(ctx.request.query))
      .toArray();
    [ctx.body] = data;
  },

};
