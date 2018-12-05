
const find = require('../../builders/v3/find');
const limit = require('../../builders/v3/limit');
const offset = require('../../builders/v3/offset');
const sort = require('../../builders/v3/sort');
const project = require('../../builders/v3/project');

module.exports = {

  /**
   * Returns all core information
   */
  all: async ctx => {
    const data = await global.db
      .collection('core')
      .find(find(ctx.request))
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
