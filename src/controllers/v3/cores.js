
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
  all: async ctx => {
    let data;
    let null_dates = [];
    if (!ctx.request.query.original_launch) {
      null_dates = await global.db
        .collection('core')
        .find(Object.assign({}, find(ctx.request), { original_launch: null }))
        .project(project(ctx.request.query))
        .sort(sort(ctx.request))
        .skip(offset(ctx.request.query))
        .limit(limit(ctx.request.query))
        .toArray();
    }
    const not_null_dates = await global.db
      .collection('core')
      .find(Object.assign({ original_launch: { $ne: null } }, find(ctx.request)))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .skip(offset(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();
    if (order(ctx.request.query) === -1) {
      data = null_dates.concat(not_null_dates);
    } else {
      data = not_null_dates.concat(null_dates);
    }
    ctx.body = data;
  },

  /**
   * Returns all cores with non null dates
   */
  past: async ctx => {
    const data = await global.db
      .collection('core')
      .find(Object.assign({}, find(ctx.request), { original_launch: { $ne: null } }))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .skip(offset(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Returns all cores with null original launches
   */
  upcoming: async ctx => {
    const data = await global.db
      .collection('core')
      .find(Object.assign({}, find(ctx.request), { original_launch: null }))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .skip(offset(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Returns specific core information
   */
  one: async ctx => {
    const data = await global.db
      .collection('core')
      .find({ core_serial: ctx.params.core })
      .project(project(ctx.request.query))
      .limit(1)
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    ctx.body = data[0];
  },

};
