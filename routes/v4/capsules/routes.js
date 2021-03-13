const Router = require('koa-router');
const Capsule = require('./model');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/capsules',
});

function getAllCapsules() {
  router.get('/', cache(300), async (ctx) => {
    try {
      const result = await Capsule.find({});
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function getOneCapsule() {
  router.get('/:id', cache(300), async (ctx) => {
    const result = await Capsule.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  });
}

function queryCapsules() {
  router.post('/query', cache(300), async (ctx) => {
    const { query = {}, options = {} } = ctx.request.body;
    try {
      const result = await Capsule.paginate(query, options);
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function createCapsule() {
  router.post('/', auth, authz('capsule:create'), async (ctx) => {
    try {
      const capsule = new Capsule(ctx.request.body);
      await capsule.save();
      ctx.status = 201;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function updateCapsule() {
  router.patch('/:id', auth, authz('capsule:update'), async (ctx) => {
    try {
      await Capsule.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function deleteCapsule() {
  router.delete('/:id', auth, authz('capsule:delete'), async (ctx) => {
    try {
      await Capsule.findByIdAndDelete(ctx.params.id);
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

getAllCapsules();
getOneCapsule();
queryCapsules();
createCapsule();
updateCapsule();
deleteCapsule();

module.exports = router;
