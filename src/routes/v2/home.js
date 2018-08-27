// API Info Endpoint

const Router = require('koa-router');
const home = require('../../controllers/v2/home');

const v2 = new Router();

// Returns API info
v2.get('/v2', home.get);

module.exports = v2;
