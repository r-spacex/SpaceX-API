
const Router = require('koa-router');
const Rocket = require('./model');
const { auth } = require('../../../middleware');

const router = new Router({
  prefix: '/',
});

module.exports = router;
