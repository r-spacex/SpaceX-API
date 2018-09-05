// Parts Endpoints

const Router = require('koa-router');
const cores = require('../../controllers/v3/cores');

const v3 = new Router({
  prefix: '/v3',
});

// Returns all core information
v3.get('/cores', cores.all);

// Returns specific core information
v3.get('/cores/:core', cores.one);

module.exports = v3;
