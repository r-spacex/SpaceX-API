// Upcoming Endpoints

const Router = require('koa-router');
const launches = require('../../controllers/v2/launches');


const v2 = new Router({
  prefix: '/v2/launches/upcoming',
});

// Return upcoming launches filtered by querystrings
v2.get('/', launches.upcoming);

module.exports = v2;
