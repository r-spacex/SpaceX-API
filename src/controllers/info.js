
module.exports = {

  /**
   * Returns company info
   */
  get: async (ctx) => {
    const data = await global.db
      .collection('info')
      .find({})
      .project({ _id: 0 })
      .toArray();
    ctx.body = data[0];
  },

};
