/* eslint-disable global-require */

const Router = require('koa-router');

const FOLDERS = [
  require('./admin'),
  require('./capsules'),
  require('./company'),
  require('./cores'),
  require('./crew'),
  require('./dragons'),
  require('./history'),
  require('./landpads'),
  require('./launches'),
  require('./launchpads'),
  require('./payloads'),
  require('./roadster'),
  require('./rockets'),
  require('./ships'),
  require('./starlink'),
  require('./users'),
];

const ROUTER = new Router();

// Register all routes + all versions
module.exports = () => {
  FOLDERS.forEach((routeFolder) => {
    routeFolder.forEach((version) => {
      ROUTER.use(version.routes());
    });
  });
  return ROUTER.routes();
};
