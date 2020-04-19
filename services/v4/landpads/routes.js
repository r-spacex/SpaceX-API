
const Router = require('koa-router');
const Landpad = require('./model');
const { auth } = require('../../../middleware');

const router = new Router({
  prefix: '/landpads',
});

// Get all landpads
router.get('/', async (ctx) => {
  ctx.state.cache = 3600;
  try {
    const result = await Landpad.find({});
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get one landpad
router.get('/:id', async (ctx) => {
  ctx.state.cache = 3600;
  try {
    const result = await Landpad.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Query landpads
router.post('/query', async (ctx) => {
  ctx.state.cache = 3600;
  const { query = {}, options = {} } = ctx.request.body;
  try {
    const result = await Landpad.paginate(query, options);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Create a landpad
router.post('/', auth('basic'), async (ctx) => {
  try {
    const core = new Landpad(ctx.request.body);
    await core.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update a landpad
router.patch('/:id', auth('basic'), async (ctx) => {
  try {
    await Landpad.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Delete landpad
router.delete('/:id', auth('basic'), async (ctx) => {
  try {
    await Landpad.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

module.exports = router;
