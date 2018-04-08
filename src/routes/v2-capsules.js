// Dragon Endpoints

const Router = require('koa-router');

const v2 = new Router({
  prefix: '/v2/capsules',
});

// Returns all Dragon data
v2.get('/', async (ctx) => {
  const data = await global.db
    .collection('dragon')
    .find({})
    .project({ _id: 0 })
    .toArray();
  ctx.body = data;
});

// Returns specific Dragon data
v2.get('/:capsule', async (ctx) => {
  const data = await global.db
    .collection('dragon')
    .find({ id: ctx.params.capsule })
    .project({ _id: 0 })
    .toArray();
  ctx.body = data[0];
});

module.exports = v2;
