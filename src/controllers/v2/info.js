
const db = require('mongoose').connection;
const project = require('../../lib/query-builder/v2/project');

module.exports = {

  /**
   * Returns company info
   */
  get: async (ctx) => {
    const data = await db
      .collection('info')
      .find({ name: 'SpaceX' })
      .project(project(ctx.request.query))
      .toArray();
    [ctx.body] = data;
  },

  /**
   * Returns Falcon Heavy roadster info
   */
  roadster: async (ctx) => {
    const data = await db
      .collection('info')
      .find({ name: "Elon Musk's Tesla Roadster" })
      .project(project(ctx.request.query))
      .toArray();
    [ctx.body] = data;
  },

};
