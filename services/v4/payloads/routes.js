
const Router = require('koa-router');
const Payload = require('./model');
const { auth } = require('../../../middleware');

const router = new Router({
  prefix: '/',
});

module.exports = router;
