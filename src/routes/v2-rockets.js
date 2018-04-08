// Rocket Endpoints

const Router = require('koa-router');

const v2 = new Router({
  prefix: '/v2/rockets',
});

// Returns all rocket info
v2.get('/', async (ctx) => {
  const data = await global.db
    .collection('rocket')
    .find({})
    .project({ _id: 0 })
    .sort({ id: 1 })
    .toArray();
  ctx.body = data;
});

// Returns specific rocket info
v2.get('/:rocket', async (ctx) => {
  const data = await global.db
    .collection('rocket')
    .find({ id: ctx.params.rocket })
    .project({ _id: 0 })
    .toArray();
  ctx.body = data[0];
});

module.exports = v2;
