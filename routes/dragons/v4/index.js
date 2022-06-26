import Router from 'koa-router';
import { Dragon } from '../../../models/index.js';
import { auth, authz, cache } from '../../../middleware/index.js';

const router = new Router({
  prefix: '/(v4|latest)/dragons',
});

// Get all dragons
router.get('/', cache(86400), async (ctx) => {
  try {
    const result = await Dragon.find({}, null, { sort: { name: 'asc' } });
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get one dragon
router.get('/:id', cache(86400), async (ctx) => {
  const result = await Dragon.findById(ctx.params.id);
  if (!result) {
    ctx.throw(404);
  }
  ctx.status = 200;
  ctx.body = result;
});

// Query dragons
router.post('/query', cache(86400), async (ctx) => {
  const { query = {}, options = {} } = ctx.request.body;
  try {
    const result = await Dragon.paginate(query, options);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Create a dragon
router.post('/', auth, authz('dragon:create'), async (ctx) => {
  try {
    const dragon = new Dragon(ctx.request.body);
    await dragon.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update a dragon
router.patch('/:id', auth, authz('dragon:update'), async (ctx) => {
  try {
    await Dragon.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Delete dragon
router.delete('/:id', auth, authz('dragon:delete'), async (ctx) => {
  try {
    await Dragon.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

export default router;
