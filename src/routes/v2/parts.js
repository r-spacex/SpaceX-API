// Parts Endpoints

const Router = require('koa-router');
const parts = require('../../controllers/v2/parts');

const v2 = new Router({
  prefix: '/v2/parts',
});

// Returns all capsule information
v2.get('/caps', parts.allCaps);

// Returns specific capsule information
v2.get('/caps/:cap', parts.oneCap);

// Returns all core information
v2.get('/cores', parts.allCores);

// Returns specific core information
v2.get('/cores/:core', parts.oneCore);

module.exports = v2;
