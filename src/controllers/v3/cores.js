
const find = require('../../lib/query-builder/v3/find');
const limit = require('../../lib/query-builder/v3/limit');
const offset = require('../../lib/query-builder/v3/offset');
const order = require('../../lib/query-builder/v3/order');
const sort = require('../../lib/query-builder/v3/sort');
const project = require('../../lib/query-builder/v3/project');

module.exports = {

  /**
   * Returns all core information
   */
  all: async (ctx) => {
    let data;
    let nullDates = [];
    let nullDatesCount = 0;
    if (!ctx.request.query.original_launch) {
      nullDates = await global.db
        .collection('core')
        .find({ ...find(ctx.request), original_launch: null })
        .project(project(ctx.request.query))
        .sort(sort(ctx.request))
        .skip(offset(ctx.request.query))
        .limit(limit(ctx.request.query));
      nullDatesCount = await nullDates.count(false);
      nullDates = await nullDates.toArray();
    }
    let notNullDates = await global.db
      .collection('core')
      .find({ original_launch: { $ne: null }, ...find(ctx.request) })
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .skip(offset(ctx.request.query))
      .limit(limit(ctx.request.query));
    const notNullDatesCount = await notNullDates.count(false);
    notNullDates = await notNullDates.toArray();
    const count = nullDatesCount + notNullDatesCount;
    ctx.set('spacex-api-count', count);
    ctx.state.count = count;
    if (order(ctx.request.query) === -1) {
      data = (nullDates).concat(notNullDates);
    } else {
      data = (notNullDates).concat(nullDates);
    }
    ctx.body = data;
  },

  /**
   * Returns all cores with non null dates
   */
  past: async (ctx) => {
    const data = await global.db
      .collection('core')
      .find({ ...find(ctx.request), original_launch: { $ne: null } })
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .skip(offset(ctx.request.query))
      .limit(limit(ctx.request.query));
    ctx.state.data = data;
    const res = await data.toArray();
    ctx.body = res;
  },

  /**
   * Returns all cores with null original launches
   */
  upcoming: async (ctx) => {
    const data = await global.db
      .collection('core')
      .find({ ...find(ctx.request), original_launch: null })
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .skip(offset(ctx.request.query))
      .limit(limit(ctx.request.query));
    ctx.state.data = data;
    const res = await data.toArray();
    ctx.body = res;
  },

  /**
   * Returns specific core information
   */
  one: async (ctx) => {
    const data = await global.db
      .collection('core')
      .find({ core_serial: ctx.params.core })
      .project(project(ctx.request.query))
      .limit(1)
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    [ctx.body] = data;
  },
};
