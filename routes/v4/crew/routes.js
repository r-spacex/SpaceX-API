const Router = require('koa-router');
const Crew = require('./model');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/crew',
});

function getAllCrew() {
  router.get('/', cache(300), async (ctx) => {
    try {
      const result = await Crew.find({});
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function getOneCrewMember() {
  router.get('/:id', cache(300), async (ctx) => {
    const result = await Crew.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  });
}

function queryCrewMembers() {
  router.post('/query', cache(300), async (ctx) => {
    const { query = {}, options = {} } = ctx.request.body;
    try {
      const result = await Crew.paginate(query, options);
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function createCrewMember() {
  router.post('/', auth, authz('crew:create'), async (ctx) => {
    try {
      const crew = new Crew(ctx.request.body);
      await crew.save();
      ctx.status = 201;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function updateCrewMember() {
  router.patch('/:id', auth, authz('crew:update'), async (ctx) => {
    try {
      await Crew.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function deleteCrewMember() {
  router.delete('/:id', auth, authz('crew:delete'), async (ctx) => {
    try {
      await Crew.findByIdAndDelete(ctx.params.id);
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

getAllCrew();
getOneCrewMember();
queryCrewMembers();
createCrewMember();
updateCrewMember();
deleteCrewMember();

module.exports = router;
