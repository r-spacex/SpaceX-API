// Crew Endpoints

const Router = require('koa-router');
const crew = require('../../controllers/v3/crew');

const v3 = new Router({
  prefix: '/v3',
});

// Returns all crew
v3.get('/crew', crew.all);

// Returns one crew member
v3.get('/crew/:crewId', crew.one);

module.exports = v3;
