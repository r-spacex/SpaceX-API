
const project = require('../../builders/v2/project');

module.exports = {

  /**
   * Returns company info
   */
  get: async ctx => {
    const data = await global.db
      .collection('info')
      .find({})
      .project(project(ctx.request.query))
      .toArray();
    ctx.body = data[0];
  },

  /**
   * Returns Falcon Heavy roadster info
   */
  roadster: async ctx => {
    const data = await global.db
      .collection('info')
      .find({ name: "Elon Musk's Tesla Roadster" })
      .project(project(ctx.request.query))
      .toArray();
    ctx.body = data[0];
  },

};
