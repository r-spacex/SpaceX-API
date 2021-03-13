const Router = require('koa-router');
const Dragon = require('./model');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/dragons',
});

function getAllDragons() {
  router.get('/', cache(86400), async (ctx) => {
    try {
      const result = await Dragon.find({}, null, { sort: { name: 'asc' } });
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function getOneDragon() {
  router.get('/:id', cache(86400), async (ctx) => {
    const result = await Dragon.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  });
}

function queryDragons() {
  router.post('/query', cache(86400), async (ctx) => {
    const { query = {}, options = {} } = ctx.request.body;
    try {
      const result = await Dragon.paginate(query, options);
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function createDragon() {
  router.post('/', auth, authz('dragon:create'), async (ctx) => {
    try {
      const dragon = new Dragon(ctx.request.body);
      await dragon.save();
      ctx.status = 201;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function updateDragon() {
  router.patch('/:id', auth, authz('dragon:update'), async (ctx) => {
    try {
      await Dragon.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function deleteDragon() {
  router.delete('/:id', auth, authz('dragon:delete'), async (ctx) => {
    try {
      await Dragon.findByIdAndDelete(ctx.params.id);
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

getAllDragons();
getOneDragon();
queryDragons();
createDragon();
updateDragon();
deleteDragon();

module.exports = router;
