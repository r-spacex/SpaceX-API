// Launchpad Endpoints

const Router = require('koa-router');
const launchpads = require('../../controllers/v2/launchpads');

const v2 = new Router({
  prefix: '/v2/launchpads',
});

// Return all launchpads
v2.get('/', launchpads.all);

// Return specific launchpad
v2.get('/:pad', launchpads.specific);

module.exports = v2;
