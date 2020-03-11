
const Router = require('koa-router');
const capsules = require('./capsules');
const cores = require('./cores');
const crew = require('./crew');
const dragons = require('./dragons');
const landpads = require('./landpads');
const launches = require('./launches');
const launchpads = require('./launchpads');
const payloads = require('./payloads');
const rockets = require('./rockets');
const ships = require('./ships');

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
