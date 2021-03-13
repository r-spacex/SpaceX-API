const Router = require('koa-router');
const Company = require('./model');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/company',
});

function getCompanyInfo() {
  router.get('/', cache(86400), async (ctx) => {
    try {
      const result = await Company.findOne({});
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function updateCompanyInfo() {
  router.patch('/:id', auth, authz('company:update'), async (ctx) => {
    try {
      await Company.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

getCompanyInfo();
updateCompanyInfo();

module.exports = router;
