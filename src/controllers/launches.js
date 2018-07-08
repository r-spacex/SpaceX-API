
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
      .collection('launch_v2')
      .find({})
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
      .collection('upcoming_v2')
      .find({})
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
    let data;
    const past = await global.db
      .collection('launch_v2')
      .find(launchQuery(ctx.request))
      .project(projectQuery(ctx.request))
      .sort(sortQuery(ctx.request))
      .limit(limitQuery(ctx.request))
      .toArray();
    const upcoming = await global.db
      .collection('upcoming_v2')
      .find(launchQuery(ctx.request))
      .project(projectQuery(ctx.request))
      .sort(sortQuery(ctx.request))
      .limit(limitQuery(ctx.request))
      .toArray();
    if (past.length !== 0 && past[past.length - 1].flight_number === 1) {
      data = upcoming.concat(past);
    } else {
      data = past.concat(upcoming);
    }
    ctx.body = data;
  },

  /**
   * Return all past launches filtered by querystrings
   */
  past: async (ctx) => {
    const data = await global.db
      .collection('launch_v2')
      .find(launchQuery(ctx.request))
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
      .collection('upcoming_v2')
      .find(launchQuery(ctx.request))
      .project(projectQuery(ctx.request))
      .sort(sortQuery(ctx.request))
      .limit(limitQuery(ctx.request))
      .toArray();
    ctx.body = data;
  },

};
