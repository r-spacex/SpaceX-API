
const Router = require('koa-router');
const Capsule = require('./model');
const { auth } = require('../../../middleware');

const router = new Router({
  prefix: '/capsules',
});

// Get one capsule
router.get('/:id', async (ctx) => {

});

// Query capsules
router.post('/query', async (ctx) => {

});

// Create capsule
router.post('/', auth, async (ctx) => {

});

// Update capsule
router.put('/:id', auth, async (ctx) => {

});

// Delete capsule
router.delete('/:id', auth, async (ctx) => {

});

module.exports = router;
