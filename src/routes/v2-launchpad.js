// Launchpad Endpoints

const Router = require('koa-router');

const v2 = new Router({
  prefix: '/v2/launchpads',
});

// Return all launchpads
v2.get('/', async (ctx) => {
  const data = await global.db
    .collection('launchpad')
    .find({})
    .project({ _id: 0 })
    .toArray();
  ctx.body = data;
});

// Return specific launchpad
v2.get('/:pad', async (ctx) => {
  const data = await global.db
    .collection('launchpad')
    .find({ id: ctx.params.pad })
    .project({ _id: 0 })
    .toArray();
  ctx.body = data[0];
});

module.exports = v2;
