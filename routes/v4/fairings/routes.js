const Router = require('koa-router');
const Fairing = require('./model');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/fairings',
});

// Get all fairings
router.get('/', cache(300), async (ctx) => {
  try {
    const result = await Fairing.find({});
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get one fairing
router.get('/:id', cache(300), async (ctx) => {
  const result = await Fairing.findById(ctx.params.id);
  if (!result) {
    ctx.throw(404);
  }
  ctx.status = 200;
  ctx.body = result;
});

// Query fairings
router.post('/query', cache(300), async (ctx) => {
  const { query = {}, options = {} } = ctx.request.body;
  try {
    const result = await Fairing.paginate(query, options);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Create a fairing
router.post('/', auth, authz('fairing:create'), async (ctx) => {
  try {
    const fairing = new Fairing(ctx.request.body);
    await fairing.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update a fairing
router.patch('/:id', auth, authz('fairing:update'), async (ctx) => {
  try {
    await Fairing.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Delete a fairing
router.delete('/:id', auth, authz('fairing:delete'), async (ctx) => {
  try {
    await Fairing.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

module.exports = router;
