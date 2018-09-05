// SpaceX Company Info Endpoints

const Router = require('koa-router');
const info = require('../../controllers/v3/info');

const v3 = new Router({
  prefix: '/v3',
});

// Returns company info
v3.get('/info', info.company);

// Returns API info
v3.get('/', info.api);

module.exports = v3;
