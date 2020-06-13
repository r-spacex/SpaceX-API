const Router = require('koa-router');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/admin',
});

// Clear redis cache
router.delete('/cache', auth, authz, async (ctx) => {
  try {
    await cache.redis.flushall();
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Healthcheck
router.get('/health', async (ctx) => {
  ctx.status = 200;
});

module.exports = router;
