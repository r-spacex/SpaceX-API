const Router = require('koa-router');
const Starlink = require('./model');
const { auth, authz, cache } = require('../../../middleware');

const router = new Router({
  prefix: '/starlink',
});

function getAllStarlinkSatellites() {
  router.get('/', cache(3600), async (ctx) => {
    try {
      const result = await Starlink.find({});
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function getOneStarlinkSatellite() {
  router.get('/:id', cache(3600), async (ctx) => {
    const result = await Starlink.findById(ctx.params.id);
    if (!result) {
      ctx.throw(404);
    }
    ctx.status = 200;
    ctx.body = result;
  });
}

function queryStarlinkSatellites() {
  router.post('/query', cache(3600), async (ctx) => {
    const { query = {}, options = {} } = ctx.request.body;
    try {
      const result = await Starlink.paginate(query, options);
      ctx.status = 200;
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function createStarlinkSatellite() {
  router.post('/', auth, authz('starlink:create'), async (ctx) => {
    try {
      const ship = new Starlink(ctx.request.body);
      await ship.save();
      ctx.status = 201;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function updateStarlinkSatellite() {
  router.patch('/:norad_id', auth, authz('starlink:update'), async (ctx) => {
    try {
      await Starlink.findOneAndUpdate({ 'spaceTrack.NORAD_CAT_ID': ctx.params.norad_id }, ctx.request.body, {
        runValidators: true,
        setDefaultsOnInsert: true,
        upsert: true,
      });
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

function deleteStarlinkSatellite() {
  router.delete('/:id', auth, authz('starlink:delete'), async (ctx) => {
    try {
      await Starlink.findByIdAndDelete(ctx.params.id);
      ctx.status = 200;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  });
}

getAllStarlinkSatellites();
getOneStarlinkSatellite();
queryStarlinkSatellites();
createStarlinkSatellite();
updateStarlinkSatellite();
deleteStarlinkSatellite();

module.exports = router;
