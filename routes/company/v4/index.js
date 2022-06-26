import Router from 'koa-router';
import { Company } from '../../../models/index.js';
import { auth, authz, cache } from '../../../middleware/index.js';

const router = new Router({
  prefix: '/(v4|latest)/company',
});

// Get company info
router.get('/', cache(86400), async (ctx) => {
  try {
    const result = await Company.findOne({});
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

// Update company info
router.patch('/:id', auth, authz('company:update'), async (ctx) => {
  try {
    await Company.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
    ctx.status = 200;
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

export default router;
