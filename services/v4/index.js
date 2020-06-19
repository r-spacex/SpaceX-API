const Router = require('koa-router');
const admin = require('./admin/routes');
const capsules = require('./capsules/routes');
const cores = require('./cores/routes');
const crew = require('./crew/routes');
const dragons = require('./dragons/routes');
const landpads = require('./landpads/routes');
const launches = require('./launches/routes');
const launchpads = require('./launchpads/routes');
const payloads = require('./payloads/routes');
const rockets = require('./rockets/routes');
const ships = require('./ships/routes');
const users = require('./users/routes');
const company = require('./company/routes');
const roadster = require('./roadster/routes');
const starlink = require('./starlink/routes');

const v4 = new Router({
  prefix: '/v4',
});

v4.use(admin.routes());
v4.use(capsules.routes());
v4.use(cores.routes());
v4.use(crew.routes());
v4.use(dragons.routes());
v4.use(landpads.routes());
v4.use(launches.routes());
v4.use(launchpads.routes());
v4.use(payloads.routes());
v4.use(rockets.routes());
v4.use(ships.routes());
v4.use(users.routes());
v4.use(company.routes());
v4.use(roadster.routes());
v4.use(starlink.routes());

module.exports = v4;
