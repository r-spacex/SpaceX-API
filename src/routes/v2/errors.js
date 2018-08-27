// API Info Endpoint

const Router = require('koa-router');
const errors = require('../../controllers/v2/errors');

const v2 = new Router();

// Throws sample 500 error
v2.get('/v2/errors/500', errors.five);

// Show error msg for old v1 endpoints
v2.get('/v1(.*)', errors.v1);

module.exports = v2;
