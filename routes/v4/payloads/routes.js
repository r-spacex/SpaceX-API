const Router = require('koa-router');
const Payload = require('./model');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/payloads',
});

function getAllPayloads() {
  router.get('/', cache(300), async (ctx) => {
    try {
      const result = await Payload.find({});
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function getOnePayload() {
  router.get('/:id', cache(300), async (ctx) => {
    const result = await Payload.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  });
}

function queryPayloads() {
  router.post('/query', cache(300), async (ctx) => {
    const { query = {}, options = {} } = ctx.request.body;
    try {
      const result = await Payload.paginate(query, options);
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function createPayload() {
  router.post('/', auth, authz('payload:create'), async (ctx) => {
    try {
      const payload = new Payload(ctx.request.body);
      await payload.save();
      ctx.status = 201;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function updatePayload() {
  router.patch('/:id', auth, authz('payload:update'), async (ctx) => {
    try {
      await Payload.findByIdAndUpdate(ctx.params.id, ctx.request.body, {
        runValidators: true,
      });
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function deletePayload() {
  router.delete('/:id', auth, authz('payload:delete'), async (ctx) => {
    try {
      await Payload.findByIdAndDelete(ctx.params.id);
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

getAllPayloads();
getOnePayload();
queryPayloads();
createPayload();
updatePayload();
deletePayload();

module.exports = router;
