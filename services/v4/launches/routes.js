
const Router = require('koa-router');
const Launch = require('./model');
const { auth } = require('../../../middleware');

const router = new Router({
  prefix: '/launches',
});

// Get all launches
router.get('/', async (ctx) => {
  try {
    const result = await Launch.find({});
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get one launch
router.get('/:id', async (ctx) => {
  try {
    const result = await Launch.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Query launches
router.post('/query', async (ctx) => {
  const { query, options } = ctx.request.body;
  try {
    const result = await Launch.paginate(query, options);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Create a launch
router.post('/', auth, async (ctx) => {
  try {
    const core = new Launch(ctx.request.body);
    await core.save();
    ctx.status = 201;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update a launch
router.patch('/:id', auth, async (ctx) => {
  try {
    await Launch.findByIdAndUpdate(ctx.params.id, ctx.request.body, {
      runValidators: true,
    });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Delete a launch
router.delete('/:id', auth, async (ctx) => {
  try {
    await Launch.findByIdAndDelete(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

//
// Convenience Endpoints
//

// Get past launches
router.get('/past', async (ctx) => {
  try {
    const result = await Launch.find({
      upcoming: false,
    }, null, {
      sort: {
        flight_number: 'asc',
      },
    });
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get upcoming launches
router.get('/upcoming', async (ctx) => {
  try {
    const result = await Launch.find({
      upcoming: true,
    }, null, {
      sort: {
        flight_number: 'asc',
      },
    });
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get latest launch
router.get('/latest', async (ctx) => {
  try {
    const result = await Launch.findOne({
      upcoming: false,
    }, null, {
      sort: {
        flight_number: 'desc',
      },
    });
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Get next launch
router.get('/next', async (ctx) => {
  try {
    const result = await Launch.findOne({
      upcoming: true,
    }, null, {
      sort: {
        flight_number: 'asc',
      },
    });
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

module.exports = router;
