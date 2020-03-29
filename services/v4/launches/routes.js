
const Router = require('koa-router');
const Launch = require('./model');
const { auth } = require('../../../middleware');

const router = new Router({
  prefix: '/',
});

module.exports = router;
