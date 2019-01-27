
const limit = require('../../lib/query-builder/v2/limit');
const find = require('../../lib/query-builder/v2/find');
const project = require('../../lib/query-builder/v2/project');

module.exports = {

  /**
   * Returns all missions
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('mission')
      .find(find(ctx.request))
      .project(project(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();

    ctx.body = data;
  },

  /**
   * Returns single mission
   */
  one: async (ctx) => {
    const data = await global.db
      .collection('mission')
      .find({ mission_id: ctx.params.mission_id })
      .project(project(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();

    [ctx.body] = data;
  },
};
