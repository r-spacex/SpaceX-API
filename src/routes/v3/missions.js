// Missions Endpoints

const Router = require('koa-router');
const missions = require('../../controllers/v3/missions');

const v3 = new Router({
  prefix: '/v3',
});

// Returns all missions
v3.get('/missions', missions.all);

// Returns specific mission info
v3.get('/missions/:mission_id', missions.one);

module.exports = v3;
