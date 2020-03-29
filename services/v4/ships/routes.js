
const Router = require('koa-router');
const Ship = require('./model');
const { auth } = require('../../../middleware');

const router = new Router({
  prefix: '/',
});

module.exports = router;
