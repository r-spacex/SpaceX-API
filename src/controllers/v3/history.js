
const sort = require('../../builders/sort/v3-sort');
const query = require('../../builders/query/history-query');
const limit = require('../../builders/limit');
const project = require('../../builders/project');

module.exports = {

  /**
   * Get all historical events
   */
  all: async ctx => {
    const data = await global.db
      .collection('history')
      .find(query(ctx.request.query))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
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
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    ctx.body = data[0];
  },

};
