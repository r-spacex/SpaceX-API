
const sort = require('../../lib/query-builder/v2/sort');
const find = require('../../lib/query-builder/v2/find');
const limit = require('../../lib/query-builder/v2/limit');
const project = require('../../lib/query-builder/v2/project');

module.exports = {

  /**
   * Get all SpaceX History
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('history')
      .find(find(ctx.request))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

};
