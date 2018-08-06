
const historySort = require('../builders/history-sort');
const historyQuery = require('../builders/history-query');
const limitQuery = require('../builders/limit-query');

module.exports = {

  /**
   * Get all SpaceX History
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('history')
      .find(historyQuery(ctx.request.query))
      .project({ _id: 0 })
      .sort(historySort(ctx.request.query))
      .limit(limitQuery(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

};
