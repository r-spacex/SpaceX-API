
const Router = require('koa-router');
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

const v4 = new Router({
  prefix: '/v4',
});

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

module.exports = v4;
