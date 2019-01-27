
const find = require('../../lib/query-builder/v2/find');
const limit = require('../../lib/query-builder/v2/limit');
const sort = require('../../lib/query-builder/v2/sort');
const project = require('../../lib/query-builder/v2/project');

module.exports = {

  /**
   * Returns all capsule information
   */
  allCaps: async (ctx) => {
    const data = await global.db
      .collection('capsule')
      .find(find(ctx.request))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Returns specific capsule information
   */
  oneCap: async (ctx) => {
    const data = await global.db
      .collection('capsule')
      .find({ capsule_serial: ctx.params.cap })
      .project(project(ctx.request.query))
      .toArray();
    [ctx.body] = data;
  },

  /**
   * Returns all core information
   */
  allCores: async (ctx) => {
    const data = await global.db
      .collection('core')
      .find(find(ctx.request))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Returns specific core information
   */
  oneCore: async (ctx) => {
    const data = await global.db
      .collection('core')
      .find({ core_serial: ctx.params.core })
      .project(project(ctx.request.query))
      .toArray();
    [ctx.body] = data;
  },

};
