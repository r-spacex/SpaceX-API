
const Router = require('koa-router');
const { auth, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/admin',
});

// Clear redis cache
router.post('/clear_cache', auth('basic'), async (ctx) => {
  try {
    await cache.redis.flushall();
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

module.exports = router;
