
const Router = require('koa-router');
const Payload = require('./model');
const { auth } = require('../../../middleware');

const router = new Router({
  prefix: '/payloads',
});

// Get all payloads
router.get('/', async (ctx) => {
  ctx.state.cache = 300;
  try {
    const result = await Payload.find({});
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get one payload
router.get('/:id', async (ctx) => {
  ctx.state.cache = 300;
  try {
    const result = await Payload.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Query payloads
router.post('/query', async (ctx) => {
  ctx.state.cache = 300;
  const { query = {}, options = {} } = ctx.request.body;
  try {
    const result = await Payload.paginate(query, options);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Create a payload
router.post('/', auth('basic'), async (ctx) => {
  try {
    const core = new Payload(ctx.request.body);
    await core.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update a payload
router.patch('/:id', auth('basic'), async (ctx) => {
  try {
    await Payload.findByIdAndUpdate(ctx.params.id, ctx.request.body, {
      runValidators: true,
    });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Delete a payload
router.delete('/:id', auth('basic'), async (ctx) => {
  try {
    await Payload.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

module.exports = router;
