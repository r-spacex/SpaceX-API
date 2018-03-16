// Upcoming Endpoints

const Router = require('koa-router');
const { fetchLaunch } = require('../helpers/launch-database');

const v2 = new Router({
  prefix: '/v2/launches/upcoming',
});

// Return upcoming launches filtered by querystrings
v2.get('/', async (ctx) => {
  const data = await fetchLaunch('upcoming_v2', ctx.request);
  ctx.body = data;
});

module.exports = v2;
