// Dragon Endpoints

const Router = require('koa-router');
const capsules = require('../../controllers/v2/capsules');

const v2 = new Router({
  prefix: '/v2/capsules',
});

// Returns all Dragon data
v2.get('/', capsules.all);

// Returns specific Dragon data
v2.get('/:capsule', capsules.specific);

module.exports = v2;
