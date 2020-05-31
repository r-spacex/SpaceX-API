
const Router = require('koa-router');
const Ship = require('./model');
const { auth, authz } = require('../../../middleware');

const router = new Router({
  prefix: '/ships',
});

// Get all ships
router.get('/', async (ctx) => {
  ctx.state.cache = 300;
  try {
    const result = await Ship.find({});
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get one ship
router.get('/:id', async (ctx) => {
  ctx.state.cache = 300;
  try {
    const result = await Ship.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Query ships
router.post('/query', async (ctx) => {
  ctx.state.cache = 300;
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
router.post('/', auth, authz, async (ctx) => {
  try {
    const ship = new Ship(ctx.request.body);
    await ship.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update a ship
router.patch('/:id', auth, authz, async (ctx) => {
  try {
    await Ship.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Delete a ship
router.delete('/:id', auth, authz, async (ctx) => {
  try {
    await Ship.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

module.exports = router;
