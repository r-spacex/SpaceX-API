
const find = require('../../lib/query-builder/v2/find');
const sort = require('../../lib/query-builder/v2/sort');
const project = require('../../lib/query-builder/v2/project');
const limit = require('../../lib/query-builder/v2/limit');

module.exports = {

  /**
   * Return most recent launch
   */
  latest: async (ctx) => {
    const data = await global.db
      .collection('launch')
      .find({ upcoming: false })
      .project(project(ctx.request.query))
      .sort({ flight_number: -1 })
      .limit(1)
      .toArray();
    [ctx.body] = data;
  },

  /**
   * Return next launch
   */
  next: async (ctx) => {
    const data = await global.db
      .collection('launch')
      .find({ upcoming: true })
      .project(project(ctx.request.query))
      .sort({ flight_number: 1 })
      .limit(1)
      .toArray();
    [ctx.body] = data;
  },

  /**
   * Return all past and upcoming launches
   */
  all: async (ctx) => {
    console.log(find(ctx.request));
    const data = await global.db
      .collection('launch')
      .find(find(ctx.request))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Return all past launches filtered by querystrings
   */
  past: async (ctx) => {
    const data = await global.db
      .collection('launch')
      .find({ upcoming: false, ...find(ctx.request) })
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

  /**
   * Return upcoming launches filtered by querystrings
   */
  upcoming: async (ctx) => {
    const data = await global.db
      .collection('launch')
      .find({ upcoming: true, ...find(ctx.request) })
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();
    ctx.body = data;
  },

};
