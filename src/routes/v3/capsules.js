// Parts Endpoints

const Router = require('koa-router');
const capsules = require('../../controllers/v3/capsules');

const v3 = new Router({
  prefix: '/v3',
});

// Returns all capsule information
v3.get('/caps', capsules.all);

// Returns specific capsule information
v3.get('/caps/:cap', capsules.one);

module.exports = v3;
