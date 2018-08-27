// Missions Endpoints

const Router = require('koa-router');
const missions = require('../../controllers/v2/missions');

const v2 = new Router({
  prefix: '/v2',
});

// Returns all missions
v2.get('/missions', missions.all);

// Returns specific mission info
v2.get('/missions/:mission_id', missions.one);

module.exports = v2;
