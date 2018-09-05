// Dragon Endpoints

const Router = require('koa-router');
const dragons = require('../../controllers/v3/dragons');

const v3 = new Router({
  prefix: '/v3/dragons',
});

// Returns all Dragon data
v3.get('/', dragons.all);

// Returns specific Dragon data
v3.get('/:capsule', dragons.one);

module.exports = v3;
