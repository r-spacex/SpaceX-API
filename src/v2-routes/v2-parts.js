// Parts Endpoints

const Router = require('koa-router');
const cores = require('../builders/core-query');
const caps = require('../builders/capsule-query');

const v2 = new Router({
  prefix: '/v2/parts',
});

// Returns all capsule information
v2.get('/caps', async (ctx) => {
  const data = await global.db
    .collection('capsule')
    .find(caps.capsuleQuery(ctx.request))
    .project({ _id: 0 })
    .sort({ original_launch: 1, capsule_serial: 1 })
    .toArray();
  ctx.body = data;
});

// Returns specific capsule information
v2.get('/caps/:cap', async (ctx) => {
  const data = await global.db
    .collection('capsule')
    .find({ capsule_serial: ctx.params.cap })
    .project({ _id: 0 })
    .toArray();
  ctx.body = data[0];
});

// Returns all core information
v2.get('/cores', async (ctx) => {
  const data = await global.db
    .collection('core')
    .find(cores.coreQuery(ctx.request))
    .project({ _id: 0 })
    .sort({ original_launch: 1, core_serial: 1 })
    .toArray();
  ctx.body = data;
});

// Returns specific core information
v2.get('/cores/:core', async (ctx) => {
  const data = await global.db
    .collection('core')
    .find({ core_serial: ctx.params.core })
    .project({ _id: 0 })
    .toArray();
  ctx.body = data[0];
});

module.exports = v2;
