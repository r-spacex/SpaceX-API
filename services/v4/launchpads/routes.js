const Router = require('koa-router');
const Launchpad = require('./model');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/launchpads',
});

// Get all launchpads
router.get('/', cache(300), async (ctx) => {
  try {
    const result = await Launchpad.find({});
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get one launchpad
router.get('/:id', cache(300), async (ctx) => {
  try {
    const result = await Launchpad.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Query launchpads
router.post('/query', cache(300), async (ctx) => {
  const { query = {}, options = {} } = ctx.request.body;
  try {
    const result = await Launchpad.paginate(query, options);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Create a launchpad
router.post('/', auth, authz, async (ctx) => {
  try {
    const launchpad = new Launchpad(ctx.request.body);
    await launchpad.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update a launchpad
router.patch('/:id', auth, authz, async (ctx) => {
  try {
    await Launchpad.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Delete a launchpad
router.delete('/:id', auth, authz, async (ctx) => {
  try {
    await Launchpad.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

module.exports = router;
