const Router = require('koa-router');
const Launch = require('./model');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/launches',
});

//
// Convenience Endpoints
//

function getPastLaunches() {
  router.get('/past', cache(20), async (ctx) => {
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
}

function getUpcomingLaunches() {
  router.get('/upcoming', cache(20), async (ctx) => {
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
}

function getLatestLaunch() {
  router.get('/latest', cache(20), async (ctx) => {
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
}

function getNextLaunch() {
  router.get('/next', cache(20), async (ctx) => {
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
}

getPastLaunches();
getUpcomingLaunches();
getLatestLaunch();
getNextLaunch();

//
// Standard Endpoints
//

function getAllLaunches() {
  router.get('/', cache(20), async (ctx) => {
    try {
      const result = await Launch.find({});
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function getOneLaunch() {
  router.get('/:id', cache(20), async (ctx) => {
    const result = await Launch.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  });
}

function queryLaunches() {
  router.post('/query', cache(20), async (ctx) => {
    const { query = {}, options = {} } = ctx.request.body;
    try {
      const result = await Launch.paginate(query, options);
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function createLaunch() {
  router.post('/', auth, authz('launch:create'), async (ctx) => {
    try {
      const launch = new Launch(ctx.request.body);
      await launch.save();
      ctx.status = 201;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function updateLaunch() {
  router.patch('/:id', auth, authz('launch:update'), async (ctx) => {
    try {
      await Launch.findByIdAndUpdate(ctx.params.id, ctx.request.body, {
        runValidators: true,
      });
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function deleteLaunch() {
  router.delete('/:id', auth, authz('launch:delete'), async (ctx) => {
    try {
      await Launch.findByIdAndDelete(ctx.params.id);
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

getAllLaunches();
getOneLaunch();
queryLaunches();
createLaunch();
updateLaunch();
deleteLaunch();

module.exports = router;
