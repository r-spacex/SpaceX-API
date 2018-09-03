
const launchQuery = require('../../builders/query/launch-query');
const sort = require('../../builders/sort/v3-sort');
const project = require('../../builders/project');
const limit = require('../../builders/limit');
const update = require('../../builders/update');

module.exports = {

  /**
   * Return most recent launch
   */
  latest: async ctx => {
    const data = await global.db
      .collection('launch')
      .find({ upcoming: false })
      .project(project(ctx.request.query))
      .sort({ flight_number: -1 })
      .limit(1)
      .toArray();
    delete data[0].reuse;
    ctx.body = data[0];
  },

  /**
   * Return next launch
   */
  next: async ctx => {
    const data = await global.db
      .collection('launch')
      .find({ upcoming: true })
      .project(project(ctx.request.query))
      .sort({ flight_number: 1 })
      .limit(1)
      .toArray();
    delete data[0].reuse;
    ctx.body = data[0];
  },

  /**
   * Return all past and upcoming launches
   */
  all: async ctx => {
    const data = await global.db
      .collection('launch')
      .find(launchQuery(ctx.request.query))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();
    data.forEach(launch => {
      delete launch.reuse;
    });
    ctx.body = data;
  },

  /**
   * Return all past launches filtered by querystrings
   */
  past: async ctx => {
    const data = await global.db
      .collection('launch')
      .find(Object.assign({ upcoming: false }, launchQuery(ctx.request.query)))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();
    data.forEach(launch => {
      delete launch.reuse;
    });
    ctx.body = data;
  },

  /**
   * Return upcoming launches filtered by querystrings
   */
  upcoming: async ctx => {
    const data = await global.db
      .collection('launch')
      .find(Object.assign({ upcoming: true }, launchQuery(ctx.request.query)))
      .project(project(ctx.request.query))
      .sort(sort(ctx.request))
      .limit(limit(ctx.request.query))
      .toArray();
    data.forEach(launch => {
      delete launch.reuse;
    });
    ctx.body = data;
  },

  /**
   * Return specifc launch from flight number
   */
  specific: async ctx => {
    const data = await global.db
      .collection('launch')
      .find({ flight_number: parseInt(ctx.params.flight_number, 10) })
      .project(project(ctx.request.query))
      .toArray();
    if (data.length === 0) {
      ctx.throw(404);
    }
    delete data[0].reuse;
    ctx.body = data[0];
  },

  /**
   * Update specific fields on launch
   */
  updateOne: async ctx => {
    const payload_index = ctx.request.body.payload_index ? ctx.request.body.payload_index : 0;
    const core_index = ctx.request.body.core_index ? ctx.request.body.core_index : 0;
    const set = update(ctx.request.body, payload_index, core_index);
    const query = { flight_number: parseInt(ctx.params.flight_number, 10) };
    await global.db.collection('launch').updateOne(query, set);
    ctx.status = 204;
  },

};
