
const find = require('../../lib/query-builder/v3/find');
const limit = require('../../lib/query-builder/v3/limit');
const offset = require('../../lib/query-builder/v3/offset');
const project = require('../../lib/query-builder/v3/project');
const sort = require('../../lib/query-builder/v3/sort');

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
      .skip(offset(ctx.request.query))
      .limit(1)
      .toArray();
    delete data[0].reuse;
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
      .skip(offset(ctx.request.query))
      .limit(1)
      .toArray();
    delete data[0].reuse;
    [ctx.body] = data;
  },

  /**
   * Return all past and upcoming launches
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('launch')
      .find(find(ctx.request))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .skip(offset(ctx.request.query))
      .limit(limit(ctx.request.query));
    ctx.state.data = data;
    const res = await data.toArray();
    res.forEach((launch) => {
      delete launch.reuse;
    });
    ctx.body = res;
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
      .skip(offset(ctx.request.query))
      .limit(limit(ctx.request.query));
    ctx.state.data = data;
    const res = await data.toArray();
    res.forEach((launch) => {
      delete launch.reuse;
    });
    ctx.body = res;
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
      .skip(offset(ctx.request.query))
      .limit(limit(ctx.request.query));
    ctx.state.data = data;
    const res = await data.toArray();
    res.forEach((launch) => {
      delete launch.reuse;
    });
    ctx.body = res;
  },

  /**
   * Return one launch from flight number
   */
  one: async (ctx) => {
    const data = await global.db
      .collection('launch')
      .find({ flight_number: parseInt(ctx.params.flight_number, 10) })
      .project(project(ctx.request.query))
      .limit(1)
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    delete data[0].reuse;
    [ctx.body] = data;
  },
};
