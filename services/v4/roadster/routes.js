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

// Update roadster
router.patch('/:id', auth, authz, async (ctx) => {
  try {
    await Roadster.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

module.exports = router;
