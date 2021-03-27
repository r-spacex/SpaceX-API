const Router = require('koa-router');
const Launch = require('../../../models/launch');
const { cache } = require('../../../middleware');

const router = new Router({
  prefix: '/launches',
});

// Query launches
router.post('/query', cache(20), async (ctx) => {
  const { query = {}, options = {} } = ctx.request.body;
  try {
    const result = await Launch.paginate(query, options);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

module.exports = router;
