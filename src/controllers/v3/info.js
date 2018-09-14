
const project = require('../../builders/v3/project');

module.exports = {

  /**
   * Returns all company info
   */
  company: async ctx => {
    const data = await global.db
      .collection('info')
      .find({})
      .project(project(ctx.request.query))
      .toArray();
    ctx.body = data[0];
  },

  /**
   * Get API info
   */
  api: async ctx => {
    const data = await global.db
      .collection('home')
      .find({})
      .project({ _id: 0 })
      .toArray();
    ctx.body = data[0];
  },

};
