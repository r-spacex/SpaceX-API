
const Router = require('koa-router');
const Dragon = require('./model');
const { auth } = require('../../../middleware');

const router = new Router({
  prefix: '/dragons',
});

// Get all dragons
router.get('/', async (ctx) => {
  ctx.state.cache = 86400;
  try {
    const result = await Dragon.find({}, null, { sort: { name: 'asc' } });
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get one dragon
router.get('/:id', async (ctx) => {
  ctx.state.cache = 86400;
  try {
    const result = await Dragon.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Query dragons
router.post('/query', async (ctx) => {
  ctx.state.cache = 86400;
  const { query = {}, options = {} } = ctx.request.body;
  try {
    const result = await Dragon.paginate(query, options);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Create a dragon
router.post('/', auth('basic'), async (ctx) => {
  try {
    const dragon = new Dragon(ctx.request.body);
    await dragon.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update a dragon
router.patch('/:id', auth('basic'), async (ctx) => {
  try {
    await Dragon.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Delete dragon
router.delete('/:id', auth('basic'), async (ctx) => {
  try {
    await Dragon.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

module.exports = router;
