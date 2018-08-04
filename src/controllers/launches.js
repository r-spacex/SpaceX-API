
const launchQuery = require('../builders/launch-query');
const sortQuery = require('../builders/launch-sort');
const projectQuery = require('../builders/project-query');
const limitQuery = require('../builders/limit-query');

module.exports = {

  /**
   * Return most recent launch
   */
  latest: async (ctx) => {
    const data = await global.db
      .collection('launch')
      .find({ upcoming: false })
      .project(projectQuery(ctx.request))
      .sort({ flight_number: -1 })
      .limit(1)
      .toArray();
    ctx.body = data[0];
  },

  /**
   * Return next launch
   */
  next: async (ctx) => {
    const data = await global.db
      .collection('launch')
      .find({ upcoming: true })
      .project(projectQuery(ctx.request))
      .sort({ flight_number: 1 })
      .limit(1)
      .toArray();
    ctx.body = data[0];
  },

  /**
   * Return all past and upcoming launches
   */
  all: async (ctx) => {
    const data = await global.db
      .collection('launch')
      .find(launchQuery(ctx.request.query))
      .project(projectQuery(ctx.request))
      .sort(sortQuery(ctx.request))
      .limit(limitQuery(ctx.request))
      .toArray();
    ctx.body = data;
  },

  /**
   * Return all past launches filtered by querystrings
   */
  past: async (ctx) => {
    const data = await global.db
      .collection('launch')
      .find(Object.assign({ upcoming: false }, launchQuery(ctx.request.query)))
      .project(projectQuery(ctx.request))
      .sort(sortQuery(ctx.request))
      .limit(limitQuery(ctx.request))
      .toArray();
    ctx.body = data;
  },

  /**
   * Return upcoming launches filtered by querystrings
   */
  upcoming: async (ctx) => {
    const data = await global.db
      .collection('launch')
      .find(Object.assign({ upcoming: true }, launchQuery(ctx.request.query)))
      .project(projectQuery(ctx.request))
      .sort(sortQuery(ctx.request))
      .limit(limitQuery(ctx.request))
      .toArray();
    ctx.body = data;
  },

};
