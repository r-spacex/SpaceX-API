
const limit = require('../../builders/limit');
const missionQuery = require('../../builders/query/mission-query');
const project = require('../../builders/project');

module.exports = {

  /**
   * Returns all missions
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('mission')
      .find(missionQuery(ctx.request.query))
      .project(project(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();

    ctx.body = data;
  },

  /**
   * Returns single mission
   */
  one: async (ctx) => {
    const data = await global.db
      .collection('mission')
      .find({ mission_id: ctx.params.mission_id })
      .project(project(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();

    ctx.body = data[0];
  },
};
