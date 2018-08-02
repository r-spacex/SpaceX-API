
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

  /**
   * Returns Falcon Heavy roadster info
   */
  roadster: async (ctx) => {
    const data = await global.db
      .collection('info')
      .find({ name: "Elon Musk's Tesla Roadster" })
      .project({ _id: 0 })
      .toArray();
    ctx.body = data[0];
  },

};
