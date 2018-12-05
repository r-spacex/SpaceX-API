
const find = require('../../builders/v3/find');
const limit = require('../../builders/v3/limit');
const offset = require('../../builders/v3/offset');
const project = require('../../builders/v3/project');
const sort = require('../../builders/v3/sort');

module.exports = {

  /**
   * Return all landing pads
   */
  all: async ctx => {
    const data = await global.db
      .collection('landpad')
      .find(find(ctx.request))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .skip(offset(ctx.request.query))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Return one landing pad by pad id
   */
  one: async ctx => {
    const data = await global.db
      .collection('landpad')
      .find({ id: ctx.params.id })
      .project(project(ctx.request.query))
      .limit(1)
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    ctx.body = data[0];
  },
};
