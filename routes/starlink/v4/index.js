import Router from 'koa-router';
import { Starlink } from '../../../models/index.js';
import { auth, authz, cache } from '../../../middleware/index.js';

const router = new Router({
  prefix: '/(v4|latest)/starlink',
});

// Get all Starlink satellites
router.get('/', cache(3600), async (ctx) => {
  try {
    const result = await Starlink.find({});
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get one Starlink satellite
router.get('/:id', cache(3600), async (ctx) => {
  const result = await Starlink.findById(ctx.params.id);
  if (!result) {
    ctx.throw(404);
  }
  ctx.status = 200;
  ctx.body = result;
});

// Query Starlink satellites
router.post('/query', cache(3600), async (ctx) => {
  const { query = {}, options = {} } = ctx.request.body;
  try {
    const result = await Starlink.paginate(query, options);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Create a Starlink satellite
router.post('/', auth, authz('starlink:create'), async (ctx) => {
  try {
    const ship = new Starlink(ctx.request.body);
    await ship.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update a Starlink satellite
router.patch('/:norad_id', auth, authz('starlink:update'), async (ctx) => {
  try {
    await Starlink.findOneAndUpdate({ 'spaceTrack.NORAD_CAT_ID': ctx.params.norad_id }, ctx.request.body, {
      runValidators: true,
      setDefaultsOnInsert: true,
      upsert: true,
    });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Delete a Starlink satellite
router.delete('/:id', auth, authz('starlink:delete'), async (ctx) => {
  try {
    await Starlink.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

export default router;
