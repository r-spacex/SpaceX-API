
const limit = require('../../builders/limit');
const project = require('../../builders/project');

module.exports = {

  /**
   * Return all launchpads
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('launchpad')
      .find({})
      .project(project(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Return specific launchpad
   */
  specific: async (ctx) => {
    const data = await global.db
      .collection('launchpad')
      .find({ id: ctx.params.pad })
      .project(project(ctx.request.query))
      .toArray();
    ctx.body = data[0];
  },

};
