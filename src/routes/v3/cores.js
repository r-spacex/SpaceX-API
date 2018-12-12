// Parts Endpoints

const Router = require('koa-router');
const cores = require('../../controllers/v3/cores');

const v3 = new Router({
  prefix: '/v3',
});

// Returns all core information
v3.get('/cores', cores.all);

// Returns all cores with null launch dates
v3.get('/cores/upcoming', cores.upcoming);

// Returns all cores with non null launch dates
v3.get('/cores/past', cores.past);

// Returns specific core information
v3.get('/cores/:core', cores.one);

module.exports = v3;
