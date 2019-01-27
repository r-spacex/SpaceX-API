
module.exports = {

  /**
   * Get API info
   */
  get: async (ctx) => {
    const data = await global.db
      .collection('home')
      .find({})
      .project({ _id: 0 })
      .toArray();
    [ctx.body] = data;
  },

};
