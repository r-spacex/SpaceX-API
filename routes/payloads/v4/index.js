import Router from 'koa-router';
import { Payload } from '../../../models/index.js';
import { auth, authz, cache } from '../../../middleware/index.js';

const router = new Router({
  prefix: '/(v4|latest)/payloads',
});

// Get all payloads
router.get('/', cache(300), async (ctx) => {
  try {
    const result = await Payload.find({});
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get one payload
router.get('/:id', cache(300), async (ctx) => {
  const result = await Payload.findById(ctx.params.id);
  if (!result) {
    ctx.throw(404);
  }
  ctx.status = 200;
  ctx.body = result;
});

// Query payloads
router.post('/query', cache(300), async (ctx) => {
  const { query = {}, options = {} } = ctx.request.body;
  try {
    const result = await Payload.paginate(query, options);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Create a payload
router.post('/', auth, authz('payload:create'), async (ctx) => {
  try {
    const payload = new Payload(ctx.request.body);
    await payload.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update a payload
router.patch('/:id', auth, authz('payload:update'), async (ctx) => {
  try {
    await Payload.findByIdAndUpdate(ctx.params.id, ctx.request.body, {
      runValidators: true,
    });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Delete a payload
router.delete('/:id', auth, authz('payload:delete'), async (ctx) => {
  try {
    await Payload.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

export default router;
