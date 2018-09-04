// Falcon Heavy tesla roadster orbit data

const Router = require('koa-router');
const roadster = require('../../controllers/v3/roadster');

const v3 = new Router({
  prefix: '/v3',
});

// Returns API info
v3.get('/roadster', roadster.orbit);

module.exports = v3;
