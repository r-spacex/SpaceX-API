
const historySort = require('../builders/history-sort');
const historyQuery = require('../builders/history-query');

module.exports = {

  /**
   * Get all SpaceX History
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('history')
      .find(historyQuery(ctx.request))
      .project({ _id: 0 })
      .sort(historySort(ctx.request))
      .toArray();
    ctx.body = data;
  },

};
