
const limit = require('../../builders/limit');
const query = require('../../builders/query/mission-query');
const project = require('../../builders/project');

module.exports = {

  /**
   * Returns all missions
   */
  all: async ctx => {
    const data = await global.db
      .collection('mission')
      .find(query(ctx.request.query))
      .project(project(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();

    ctx.body = data;
  },

  /**
   * Returns one mission
   */
  one: async ctx => {
    const data = await global.db
      .collection('mission')
      .find({ mission_id: ctx.params.mission_id })
      .project(project(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    ctx.body = data[0];
  },
};
