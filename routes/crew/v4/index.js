import Router from 'koa-router';
import { Crew } from '../../../models/index.js';
import { auth, authz, cache } from '../../../middleware/index.js';

const router = new Router({
  prefix: '/(v4|latest)/crew',
});

// Get all crew
router.get('/', cache(300), async (ctx) => {
  try {
    const result = await Crew.find({});
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get one crew member
router.get('/:id', cache(300), async (ctx) => {
  const result = await Crew.findById(ctx.params.id);
  if (!result) {
    ctx.throw(404);
  }
  ctx.status = 200;
  ctx.body = result;
});

// Query crew members
router.post('/query', cache(300), async (ctx) => {
  const { query = {}, options = {} } = ctx.request.body;
  try {
    const result = await Crew.paginate(query, options);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Create crew member
router.post('/', auth, authz('crew:create'), async (ctx) => {
  try {
    const crew = new Crew(ctx.request.body);
    await crew.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update crew member
router.patch('/:id', auth, authz('crew:update'), async (ctx) => {
  try {
    await Crew.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Delete crew member
router.delete('/:id', auth, authz('crew:delete'), async (ctx) => {
  try {
    await Crew.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

export default router;
