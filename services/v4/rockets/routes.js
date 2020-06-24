const Router = require('koa-router');
const Rocket = require('./model');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/rockets',
});

// Get all rockets
router.get('/', cache(86400), async (ctx) => {
  try {
    const result = await Rocket.find({}, null, { sort: { first_flight: 'asc' } });
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get one rocket
router.get('/:id', cache(86400), async (ctx) => {
  try {
    const result = await Rocket.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Query rocket
router.post('/query', cache(300), async (ctx) => {
  const { query = {}, options = {} } = ctx.request.body;
  try {
    const result = await Rocket.paginate(query, options);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Create a rocket
router.post('/', auth, authz, async (ctx) => {
  try {
    const rocket = new Rocket(ctx.request.body);
    await rocket.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update a rocket
router.patch('/:id', auth, authz, async (ctx) => {
  try {
    await Rocket.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Delete a rocket
router.delete('/:id', auth, authz, async (ctx) => {
  try {
    await Rocket.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

module.exports = router;
