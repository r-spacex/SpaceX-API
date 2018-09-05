// History Endpoints

const Router = require('koa-router');
const history = require('../../controllers/v3/history');

const v3 = new Router({
  prefix: '/v3',
});

// Returns all history events
v3.get('/history', history.all);

// Returns one history event
v3.get('/history/:history_id', history.one);

module.exports = v3;
