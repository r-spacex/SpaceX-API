// Launches Endpoints

const Router = require('koa-router');
const project = require('../builders/project-query');
const { fetchLaunch } = require('../helpers/launch-database');

const v2 = new Router({
  prefix: '/v2/launches',
});

// Return most recent launch
v2.get('/latest', async (ctx) => {
  const data = await global.db
    .collection('launch_v2')
    .find({})
    .project(project.queryProject(ctx.request))
    .sort({ flight_number: -1 })
    .limit(1)
    .toArray();
  ctx.body = data[0];
});

// Return all past launches filtered by querystrings
v2.get('/', async (ctx) => {
  const data = await fetchLaunch('launch_v2', ctx.request);
  ctx.body = data;
});

v2.get('/all', async (ctx) => {
  const pastData = await fetchLaunch('launch_v2', ctx.request);
  const upcomingData = await fetchLaunch('upcoming_v2', ctx.request);
  const data = pastData.concat(upcomingData);

  ctx.body = data;
});

module.exports = v2;
