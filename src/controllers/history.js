
const sort = require('../builders/sort');
const historyQuery = require('../builders/history-query');
const limit = require('../builders/limit');

module.exports = {

  /**
   * Get all SpaceX History
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('history')
      .find(historyQuery(ctx.request.query))
      .project({ _id: 0 })
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

};
