
const find = require('../../lib/query-builder/v3/find');
const limit = require('../../lib/query-builder/v3/limit');
const offset = require('../../lib/query-builder/v3/offset');
const project = require('../../lib/query-builder/v3/project');
const sort = require('../../lib/query-builder/v3/sort');

module.exports = {

  /**
   * Return all landing pads
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('landpad')
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
   * Return one landing pad by pad id
   */
  one: async (ctx) => {
    const data = await global.db
      .collection('landpad')
      .find({ id: ctx.params.id })
      .project(project(ctx.request.query))
      .limit(1)
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    [ctx.body] = data;
  },
};
