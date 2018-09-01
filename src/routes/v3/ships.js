// Ship Endpoints

const Router = require('koa-router');
const ships = require('../../controllers/v3/ships');

const v3 = new Router({
  prefix: '/v3/ships',
});

// Returns all rocket info
v3.get('/', ships.all);

// Returns specific rocket info
v3.get('/:ship_id', ships.specific);

module.exports = v3;
