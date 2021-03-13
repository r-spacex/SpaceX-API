const Router = require('koa-router');
const Rocket = require('./model');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/rockets',
});

function getAllRockets() {
  router.get('/', cache(86400), async (ctx) => {
    try {
      const result = await Rocket.find({}, null, { sort: { first_flight: 'asc' } });
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function getOneRocket() {
  router.get('/:id', cache(86400), async (ctx) => {
    const result = await Rocket.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  });
}

function queryRocket() {
  router.post('/query', cache(300), async (ctx) => {
    const { query = {}, options = {} } = ctx.request.body;
    try {
      const result = await Rocket.paginate(query, options);
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function createRocket() {
  router.post('/', auth, authz('rocket:create'), async (ctx) => {
    try {
      const rocket = new Rocket(ctx.request.body);
      await rocket.save();
      ctx.status = 201;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function updateRocket() {
  router.patch('/:id', auth, authz('rocket:update'), async (ctx) => {
    try {
      await Rocket.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function deleteRocket() {
  router.delete('/:id', auth, authz('rocket:delete'), async (ctx) => {
    try {
      await Rocket.findByIdAndDelete(ctx.params.id);
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

getAllRockets();
getOneRocket();
queryRocket();
createRocket();
updateRocket();
deleteRocket();

module.exports = router;
