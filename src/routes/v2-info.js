// SpaceX Company Info Endpoints

const Router = require('koa-router');
const info = require('../controllers/info');
const history = require('../controllers/history');

const v2 = new Router({
  prefix: '/v2/info',
});

// Returns company info
v2.get('/', info.get);
v2.get('/history', history.all);

module.exports = v2;
