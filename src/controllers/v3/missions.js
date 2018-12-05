
const find = require('../../builders/v3/find');
const limit = require('../../builders/v3/limit');
const offset = require('../../builders/v3/offset');
const project = require('../../builders/v3/project');

module.exports = {

  /**
   * Returns all missions
   */
  all: async ctx => {
    const data = await global.db
      .collection('mission')
      .find(find(ctx.request))
      .project(project(ctx.request.query))
      .skip(offset(ctx.request.query))
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
      .limit(1)
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    ctx.body = data[0];
  },
};
