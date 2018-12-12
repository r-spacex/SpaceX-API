// Parts Endpoints

const Router = require('koa-router');
const capsules = require('../../controllers/v3/capsules');

const v3 = new Router({
  prefix: '/v3',
});

// Returns all capsule information
v3.get('/capsules', capsules.all);

// Returns all capsules with null launch dates
v3.get('/capsules/upcoming', capsules.upcoming);

// Returns all capsules with non null launch dates
v3.get('/capsules/past', capsules.past);

// Returns specific capsule information
v3.get('/capsules/:cap', capsules.one);

module.exports = v3;
