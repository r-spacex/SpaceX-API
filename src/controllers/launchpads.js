
const limitQuery = require('../builders/limit-query');

module.exports = {

  /**
   * Return all launchpads
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('launchpad')
      .find({})
      .project({ _id: 0 })
      .limit(limitQuery(ctx.request))
      .toArray();
    ctx.body = data;
  },

  /**
   * Return specific launchpad
   */
  specific: async (ctx) => {
    const data = await global.db
      .collection('launchpad')
      .find({ id: ctx.params.pad })
      .project({ _id: 0 })
      .toArray();
    ctx.body = data[0];
  },

};
