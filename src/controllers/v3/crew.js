
const limit = require('../../lib/query-builder/v3/limit');
const offset = require('../../lib/query-builder/v3/offset');
const project = require('../../lib/query-builder/v3/project');

module.exports = {

  /**
   * Returns all crew members
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('crew')
      .find({})
      .project(project(ctx.request.query))
      .sort({})
      .skip(offset(ctx.request.query))
      .limit(limit(ctx.request.query));
    ctx.state.data = data;
    const res = await data.toArray();
    ctx.body = res;
  },

  /**
   * Returns one crew member
   */
  one: async (ctx) => {
    const data = await global.db
      .collection('crew')
      .find({ id: ctx.params.crewId })
      .project(project(ctx.request.query))
      .limit(1)
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    [ctx.body] = data;
  },

};
