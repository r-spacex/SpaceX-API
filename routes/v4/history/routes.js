const Router = require('koa-router');
const History = require('./model');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/history',
});

function getAllHistoryEvents() {
  router.get('/', cache(300), async (ctx) => {
    try {
      const result = await History.find({});
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function getOneHistoryEvent() {
  router.get('/:id', cache(300), async (ctx) => {
    const result = await History.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  });
}

function queryHistoryEvents() {
  router.post('/query', cache(300), async (ctx) => {
    const { query = {}, options = {} } = ctx.request.body;
    try {
      const result = await History.paginate(query, options);
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function createHistoryEvent() {
  router.post('/', auth, authz('history:create'), async (ctx) => {
    try {
      const history = new History(ctx.request.body);
      await history.save();
      ctx.status = 201;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function updateHistoryEvent() {
  router.patch('/:id', auth, authz('history:update'), async (ctx) => {
    try {
      await History.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function deleteHistoryEvent() {
  router.delete('/:id', auth, authz('history:delete'), async (ctx) => {
    try {
      await History.findByIdAndDelete(ctx.params.id);
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

getAllHistoryEvents();
getOneHistoryEvent();
queryHistoryEvents();
createHistoryEvent();
updateHistoryEvent();
deleteHistoryEvent();

module.exports = router;
