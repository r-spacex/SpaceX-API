
const sort = require('../../builders/v3/sort');
const find = require('../../builders/v3/find');
const limit = require('../../builders/v3/limit');
const offset = require('../../builders/v3/offset');
const project = require('../../builders/v3/project');

module.exports = {

  /**
   * Get all historical events
   */
  all: async ctx => {
    const data = await global.db
      .collection('history')
      .find(find(ctx.request))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .skip(offset(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Get one historical event
   */
  one: async ctx => {
    const data = await global.db
      .collection('history')
      .find({ id: parseInt(ctx.params.history_id, 10) })
      .project(project(ctx.request.query))
      .limit(1)
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    ctx.body = data[0];
  },

};
