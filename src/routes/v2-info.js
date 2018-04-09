// SpaceX Company Info Endpoints

const Router = require('koa-router');
const info = require('../controllers/info');

const v2 = new Router({
  prefix: '/v2/info',
});

// Returns company info
v2.get('/', info.get);

module.exports = v2;
