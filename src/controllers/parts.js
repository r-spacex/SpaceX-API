
const coreQuery = require('../builders/core-query');
const capQuery = require('../builders/capsule-query');
const limitQuery = require('../builders/limit-query');

module.exports = {

  /**
   * Returns all capsule information
   */
  allCaps: async (ctx) => {
    const data = await global.db
      .collection('capsule')
      .find(capQuery(ctx.request))
      .project({ _id: 0 })
      .sort({ original_launch: 1, capsule_serial: 1 })
      .limit(limitQuery(ctx.request))
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
      .project({ _id: 0 })
      .toArray();
    ctx.body = data[0];
  },

  /**
   * Returns all core information
   */
  allCores: async (ctx) => {
    const data = await global.db
      .collection('core')
      .find(coreQuery(ctx.request))
      .project({ _id: 0 })
      .sort({ original_launch: 1, core_serial: 1 })
      .limit(limitQuery(ctx.request))
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
      .project({ _id: 0 })
      .toArray();
    ctx.body = data[0];
  },

};
