// API Info Endpoint

const Router = require('koa-router');
const errors = require('../../controllers/v2/errors');

const v2 = new Router({
  prefix: '/v2/errors',
});

// Throws sample 500 error
v2.get('/500', errors.five);

module.exports = v2;
