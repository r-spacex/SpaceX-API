// SpaceX Company Info Endpoints

const Router = require('koa-router');
const info = require('../../controllers/v2/info');
const history = require('../../controllers/v2/history');

const v2 = new Router({
  prefix: '/v2/info',
});

// Returns company info
v2.get('/', info.get);
v2.get('/roadster', info.roadster);
v2.get('/history', history.all);

module.exports = v2;
