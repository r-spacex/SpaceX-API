// Payloads Endpoint

const Router = require('koa-router');
const payloads = require('../../controllers/v3/payloads');

const v3 = new Router({
  prefix: '/v3',
});

// Returns all payloads
v3.get('/payloads', payloads.all);

// Returns payload with matching payload_id
v3.get('/payloads/:payload_id', payloads.one);

module.exports = v3;
