
const project = require('../../lib/query-builder/v3/project');

module.exports = {

  /**
   * Returns all company info
   */
  company: async (ctx) => {
    ctx.set('Cache-Control', 'maxage=0, s-maxage=30');
    const data = await global.db
      .collection('info')
      .find({ name: 'SpaceX' })
      .project(project(ctx.request.query))
      .toArray();
    [ctx.body] = data;
  },

  /**
   * Get API info
   */
  api: async (ctx) => {
    const data = await global.db
      .collection('home')
      .find({})
      .project({ _id: 0 })
      .toArray();
    [ctx.body] = data;
  },

};
