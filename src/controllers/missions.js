
const limitQuery = require('../builders/limit-query');

module.exports = {

  /**
   * Returns all missions
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('mission')
      .find({})
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

    ctx.body = data;
  },
};
