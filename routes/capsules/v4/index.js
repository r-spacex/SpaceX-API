import Router from 'koa-router';
import { Capsule } from '../../../models/index.js';
import { auth, authz, cache } from '../../../middleware/index.js';

const router = new Router({
  prefix: '/(v4|latest)/capsules',
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
  const result = await Capsule.findById(ctx.params.id);
  if (!result) {
    ctx.throw(404);
  }
  ctx.status = 200;
  ctx.body = result;
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
router.post('/', auth, authz('capsule:create'), async (ctx) => {
  try {
    const capsule = new Capsule(ctx.request.body);
    await capsule.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update capsule
router.patch('/:id', auth, authz('capsule:update'), async (ctx) => {
  try {
    await Capsule.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Delete capsule
router.delete('/:id', auth, authz('capsule:delete'), async (ctx) => {
  try {
    await Capsule.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

export default router;
