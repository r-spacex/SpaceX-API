
const find = require('../../lib/query-builder/v3/find');
const limit = require('../../lib/query-builder/v3/limit');
const offset = require('../../lib/query-builder/v3/offset');
const project = require('../../lib/query-builder/v3/project');
const sort = require('../../lib/query-builder/v3/sort');

module.exports = {

  /**
   * Returns all ship info
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('ship')
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
   * Returns specific ship info
   */
  specific: async (ctx) => {
    const data = await global.db
      .collection('ship')
      .find({ ship_id: ctx.params.ship_id })
      .project(project(ctx.request.query))
      .limit(1)
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    [ctx.body] = data;
  },

};
