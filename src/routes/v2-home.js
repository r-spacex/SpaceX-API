// API Info Endpoint

const Router = require('koa-router');
const home = require('../controllers/home');

const v2 = new Router({
  prefix: '/v2',
});

// Returns API info
v2.get('/', home.get);

module.exports = v2;
