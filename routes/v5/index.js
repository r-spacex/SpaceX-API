const Router = require('koa-router');
const launches = require('./launches/routes');
const fairings = require('./fairings/routes');

const v5 = new Router({
  prefix: '/v5',
});

v5.use(launches.routes());
v5.use(fairings.routes());

module.exports = v5;
