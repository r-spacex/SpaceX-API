// Rocket Endpoints

const Router = require('koa-router');
const rockets = require('../../controllers/v3/rockets');

const v3 = new Router({
  prefix: '/v3/rockets',
});

// Returns all rocket info
v3.get('/', rockets.all);

// Returns specific rocket info
v3.get('/:rocket', rockets.specific);

module.exports = v3;
