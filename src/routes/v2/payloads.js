// Payloads Endpoint

const Router = require('koa-router');
const payloads = require('../../controllers/v2/payloads');

const v2 = new Router({
  prefix: '/v2',
});

// Returns all payloads
v2.get('/payloads', payloads.all);

// Returns payload with matching payload_id
v2.get('/payloads/:payload_id', payloads.one);

module.exports = v2;
