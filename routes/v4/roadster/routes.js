const Router = require('koa-router');
const Roadster = require('./model');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/roadster',
});

// Get roadster
router.get('/', cache(300), async (ctx) => {
  try {
    const result = await Roadster.findOne({});
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Query roadster
router.post('/query', cache(300), async (ctx) => {
  const { query = {}, options = { select: '' } } = ctx.request.body;
  try {
    const result = await Roadster.findOne(query).select(options.select).exec();
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update roadster
router.patch('/:id', auth, authz('roadster:update'), async (ctx) => {
  try {
    await Roadster.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

module.exports = router;
