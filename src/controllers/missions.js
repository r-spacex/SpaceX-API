
const limitQuery = require('../builders/limit-query');
const missionQuery = require('../builders/mission-query');

module.exports = {

  /**
   * Returns all missions
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('mission')
      .find(missionQuery(ctx.request.query))
      .project({ _id: 0 })
      .limit(limitQuery(ctx.request.query))
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
      .project({ _id: 0 })
      .limit(limitQuery(ctx.request.query))
      .toArray();

    ctx.body = data[0];
  },
};
