// API Info Endpoint

const Router = require('koa-router');

const v2 = new Router({
  prefix: '/v2',
});

// Returns API info
v2.get('/', async (ctx) => {
  const data = await global.db
    .collection('home')
    .find({})
    .project({ _id: 0 })
    .toArray();
  ctx.body = data[0];
});

module.exports = v2;
