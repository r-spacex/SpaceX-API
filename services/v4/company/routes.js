
const Router = require('koa-router');
const Company = require('./model');
const { auth, authz } = require('../../../middleware');

const router = new Router({
  prefix: '/company',
});

// Get company info
router.get('/', async (ctx) => {
  ctx.state.cache = 86400;
  try {
    const result = await Company.findOne({});
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update company info
router.patch('/:id', auth, authz, async (ctx) => {
  try {
    await Company.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

module.exports = router;
