
const query = require('../../builders/query/capsule-query');
const limit = require('../../builders/limit');
const sort = require('../../builders/sort/v3-sort');
const project = require('../../builders/project');

module.exports = {

  /**
   * Returns all capsule information
   */
  all: async ctx => {
    const data = await global.db
      .collection('capsule')
      .find(query(ctx.request.query))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Returns specific capsule information
   */
  one: async ctx => {
    const data = await global.db
      .collection('capsule')
      .find({ capsule_serial: ctx.params.cap })
      .project(project(ctx.request.query))
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    ctx.body = data[0];
  },

};
