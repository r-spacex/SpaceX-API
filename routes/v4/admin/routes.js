const Router = require('koa-router');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/admin',
});

function clearRedisCache() {
  router.delete('/cache', auth, authz('cache:clear'), async (ctx) => {
    try {
      await cache.redis.flushall();
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function checkHealth() {
  router.get('/health', async (ctx) => {
    ctx.status = 200;
  });
}

clearRedisCache();
checkHealth();

module.exports = router;
