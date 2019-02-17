
const sort = require('../../lib/query-builder/v3/sort');
const find = require('../../lib/query-builder/v3/find');
const limit = require('../../lib/query-builder/v3/limit');
const offset = require('../../lib/query-builder/v3/offset');
const project = require('../../lib/query-builder/v3/project');

module.exports = {

  /**
   * Get all historical events
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('history')
      .find(find(ctx.request))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .skip(offset(ctx.request.query))
      .limit(limit(ctx.request.query));
    ctx.state.data = data;
    const res = await data.toArray();
    ctx.body = res;
  },

  /**
   * Get one historical event
   */
  one: async (ctx) => {
    const data = await global.db
      .collection('history')
      .find({ id: parseInt(ctx.params.history_id, 10) })
      .project(project(ctx.request.query))
      .limit(1)
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    [ctx.body] = data;
  },

};
