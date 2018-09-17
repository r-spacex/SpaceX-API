
const sort = require('../../builders/v2/sort');
const find = require('../../builders/v2/find');
const limit = require('../../builders/v2/limit');
const project = require('../../builders/v2/project');

module.exports = {

  /**
   * Get all SpaceX History
   */
  all: async ctx => {
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
