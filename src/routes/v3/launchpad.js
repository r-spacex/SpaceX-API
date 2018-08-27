// Launchpad Endpoints

const Router = require('koa-router');
const launchpads = require('../../controllers/v3/launchpads');

const v3 = new Router({
  prefix: '/v3/launchpads',
});

// Return all launchpads
v3.get('/', launchpads.all);

// Return specific launchpad
v3.get('/:pad', launchpads.specific);

module.exports = v3;
