
const limit = require('../../lib/query-builder/v2/limit');
const project = require('../../lib/query-builder/v2/project');

module.exports = {

  /**
   * Return all launchpads
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('launchpad')
      .find({})
      .project(project(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Return specific launchpad
   */
  specific: async (ctx) => {
    const data = await global.db
      .collection('launchpad')
      .find({ id: ctx.params.pad })
      .project(project(ctx.request.query))
      .toArray();
    [ctx.body] = data;
  },

};
