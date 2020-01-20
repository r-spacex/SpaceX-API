
const db = require('mongoose').connection;
const project = require('../../lib/query-builder/v3/project');

module.exports = {

  /**
   * Returns Falcon Heavy roadster orbit data
   */
  orbit: async (ctx) => {
    const data = await db
      .collection('info')
      .find({ name: "Elon Musk's Tesla Roadster" })
      .project(project(ctx.request.query))
      .toArray();
    [ctx.body] = data;
  },

};
