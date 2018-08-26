
const limit = require('../builders/limit');

module.exports = {

  /**
   * Returns all Dragon data
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('dragon')
      .find({})
      .project({ _id: 0 })
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Returns specific Dragon data
   */
  specific: async (ctx) => {
    const data = await global.db
      .collection('dragon')
      .find({ id: ctx.params.capsule })
      .project({ _id: 0 })
      .toArray();
    ctx.body = data[0];
  },

};
