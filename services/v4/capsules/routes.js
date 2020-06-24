const Router = require('koa-router');
const Capsule = require('./model');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/capsules',
});

// Get all capsules
router.get('/', cache(300), async (ctx) => {
  try {
    const result = await Capsule.find({});
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get one capsule
router.get('/:id', cache(300), async (ctx) => {
  try {
    const result = await Capsule.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Query capsules
router.post('/query', cache(300), async (ctx) => {
  const { query = {}, options = {} } = ctx.request.body;
  try {
    const result = await Capsule.paginate(query, options);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Create capsule
router.post('/', auth, authz, async (ctx) => {
  try {
    const capsule = new Capsule(ctx.request.body);
    await capsule.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update capsule
router.patch('/:id', auth, authz, async (ctx) => {
  try {
    await Capsule.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Delete capsule
router.delete('/:id', auth, authz, async (ctx) => {
  try {
    await Capsule.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

module.exports = router;
