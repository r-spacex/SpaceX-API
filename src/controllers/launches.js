
const launch = require('../builders/launch-query');
const sort = require('../builders/launch-sort');
const project = require('../builders/project-query');

module.exports = {

  /**
   * Return most recent launch
   */
  latest: async (ctx) => {
    const data = await global.db
      .collection('launch_v2')
      .find({})
      .project(project.queryProject(ctx.request))
      .sort({ flight_number: -1 })
      .limit(1)
      .toArray();
    ctx.body = data[0];
  },

  /**
   * Return all past and upcoming launches
   */
  all: async (ctx) => {
    const past = await global.db
      .collection('launch_v2')
      .find(launch.launchQuery(ctx.request))
      .project(project.queryProject(ctx.request))
      .sort(sort.launchSort(ctx.request))
      .toArray();
    const upcoming = await global.db
      .collection('upcoming_v2')
      .find(launch.launchQuery(ctx.request))
      .project(project.queryProject(ctx.request))
      .sort(sort.launchSort(ctx.request))
      .toArray();
    const data = past.concat(upcoming);
    ctx.body = data;
  },

  /**
   * Return all past launches filtered by querystrings
   */
  past: async (ctx) => {
    const data = await global.db
      .collection('launch_v2')
      .find(launch.launchQuery(ctx.request))
      .project(project.queryProject(ctx.request))
      .sort(sort.launchSort(ctx.request))
      .toArray();
    ctx.body = data;
  },

  /**
   * Return upcoming launches filtered by querystrings
   */
  upcoming: async (ctx) => {
    const data = await global.db
      .collection('upcoming_v2')
      .find(launch.launchQuery(ctx.request))
      .project(project.queryProject(ctx.request))
      .sort(sort.launchSort(ctx.request))
      .toArray();
    ctx.body = data[0];
  },

};
