
const limit = require('../../builders/limit');
const project = require('../../builders/project');
const sort = require('../../builders/sort/v3-sort');

module.exports = {

  /**
   * Returns all ship info
   */
  all: async ctx => {
    const data = await global.db
      .collection('ship')
      .find({})
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Returns specific ship info
   */
  specific: async ctx => {
    const data = await global.db
      .collection('ship')
      .find({ ship_id: ctx.params.ship_id })
      .project(project(ctx.request.query))
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    ctx.body = data[0];
  },

};
