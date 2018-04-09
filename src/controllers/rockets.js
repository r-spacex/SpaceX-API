
module.exports = {

  /**
   * Returns all rocket info
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('rocket')
      .find({})
      .project({ _id: 0 })
      .sort({ id: 1 })
      .toArray();
    ctx.body = data;
  },

  /**
   * Returns specific rocket info
   */
  specific: async (ctx) => {
    const data = await global.db
      .collection('rocket')
      .find({ id: ctx.params.rocket })
      .project({ _id: 0 })
      .toArray();
    ctx.body = data[0];
  },

};
