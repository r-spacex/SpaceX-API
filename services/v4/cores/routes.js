
const Router = require('koa-router');
const Core = require('./model');
const { auth } = require('../../../middleware');

const router = new Router({
  prefix: '/cores',
});

// Get all cores
router.get('/', async (ctx) => {

});

// Get one core
router.get('/:id', async (ctx) => {

});

// Query cores
router.post('/query', async (ctx) => {

});

// Create core
router.post('/', auth, async (ctx) => {

});

// Update core
router.put('/:id', auth, async (ctx) => {

});

// Delete core
router.delete('/:id', auth, async (ctx) => {

});

module.exports = router;
