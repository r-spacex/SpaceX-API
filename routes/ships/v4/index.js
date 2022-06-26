import Router from 'koa-router';
import { Ship } from '../../../models/index.js';
import { auth, authz, cache } from '../../../middleware/index.js';

const router = new Router({
  prefix: '/(v4|latest)/ships',
});

// Get all ships
router.get('/', cache(300), async (ctx) => {
  try {
    const result = await Ship.find({});
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get one ship
router.get('/:id', cache(300), async (ctx) => {
  const result = await Ship.findById(ctx.params.id);
  if (!result) {
    ctx.throw(404);
  }
  ctx.status = 200;
  ctx.body = result;
});

// Query ships
router.post('/query', cache(300), async (ctx) => {
  const { query = {}, options = {} } = ctx.request.body;
  try {
    const result = await Ship.paginate(query, options);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Create a ship
router.post('/', auth, authz('ship:create'), async (ctx) => {
  try {
    const ship = new Ship(ctx.request.body);
    await ship.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update a ship
router.patch('/:id', auth, authz('ship:update'), async (ctx) => {
  try {
    await Ship.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Delete a ship
router.delete('/:id', auth, authz('ship:delete'), async (ctx) => {
  try {
    await Ship.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

export default router;
