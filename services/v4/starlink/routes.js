const Router = require('koa-router');
const Starlink = require('./model');
const { auth, authz } = require('../../../middleware');

const router = new Router({
  prefix: '/starlink',
});

// Get all Starlink satellites
router.get('/', async (ctx) => {
  ctx.state.cache = 300;
  try {
    const result = await Starlink.find({});
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get one Starlink satellite
router.get('/:id', async (ctx) => {
  ctx.state.cache = 300;
  try {
    const result = await Starlink.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Query Starlink satellites
router.post('/query', async (ctx) => {
  ctx.state.cache = 300;
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
router.post('/', auth, authz, async (ctx) => {
  try {
    const ship = new Starlink(ctx.request.body);
    await ship.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update a Starlink satellite
router.patch('/:norad_id', auth, authz, async (ctx) => {
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
router.delete('/:id', auth, authz, async (ctx) => {
  try {
    await Starlink.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

module.exports = router;
