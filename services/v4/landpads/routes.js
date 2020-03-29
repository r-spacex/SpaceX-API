
const Router = require('koa-router');
const Landpad = require('./model');
const { auth } = require('../../../middleware');

const router = new Router({
  prefix: '/landpads',
});

// Get one landpad
router.get('/:id', async (ctx) => {

});

// Query landpads
router.post('/query', async (ctx) => {

});

// Create landpad
router.post('/', auth, async (ctx) => {

});

// Update landpad
router.put('/:id', auth, async (ctx) => {

});

// Delete landpad
router.delete('/:id', auth, async (ctx) => {

});

module.exports = router;
