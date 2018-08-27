
const coreQuery = require('../../builders/query/core-query');
const capQuery = require('../../builders/query/capsule-query');
const limit = require('../../builders/limit');
const sort = require('../../builders/sort');
const project = require('../../builders/project');

module.exports = {

  /**
   * Returns all capsule information
   */
  allCaps: async ctx => {
    const data = await global.db
      .collection('capsule')
      .find(capQuery(ctx.request.query))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Returns specific capsule information
   */
  oneCap: async ctx => {
    const data = await global.db
      .collection('capsule')
      .find({ capsule_serial: ctx.params.cap })
      .project(project(ctx.request.query))
      .toArray();
    ctx.body = data[0];
  },

  /**
   * Returns all core information
   */
  allCores: async ctx => {
    const data = await global.db
      .collection('core')
      .find(coreQuery(ctx.request.query))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Returns specific core information
   */
  oneCore: async ctx => {
    const data = await global.db
      .collection('core')
      .find({ core_serial: ctx.params.core })
      .project(project(ctx.request.query))
      .toArray();
    ctx.body = data[0];
  },

};
