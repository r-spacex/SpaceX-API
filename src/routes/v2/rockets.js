// Rocket Endpoints

const Router = require('koa-router');
const rockets = require('../../controllers/v2/rockets');

const v2 = new Router({
  prefix: '/v2/rockets',
});

// Returns all rocket info
v2.get('/', rockets.all);

// Returns specific rocket info
v2.get('/:rocket', rockets.specific);

module.exports = v2;
