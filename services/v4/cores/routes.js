const Router = require('koa-router');
const Core = require('./model');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/cores',
});

// Get all cores
router.get('/', cache(300), async (ctx) => {
  try {
    const result = await Core.find({});
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get one core
router.get('/:id', cache(300), async (ctx) => {
  try {
    const result = await Core.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Query cores
router.post('/query', cache(300), async (ctx) => {
  const { query = {}, options = {} } = ctx.request.body;
  try {
    const result = await Core.paginate(query, options);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Create core
router.post('/', auth, authz, async (ctx) => {
  try {
    const core = new Core(ctx.request.body);
    await core.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update core
router.patch('/:id', auth, authz, async (ctx) => {
  try {
    await Core.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Delete core
router.delete('/:id', auth, authz, async (ctx) => {
  try {
    await Core.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

module.exports = router;
