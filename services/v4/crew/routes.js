
const Router = require('koa-router');
const Crew = require('./model');
const { auth } = require('../../../middleware');

const router = new Router({
  prefix: '/crew',
});

// Get all crew members
router.get('/', async (ctx) => {

});

// Get one crew member
router.get('/:id', async (ctx) => {

});

// Query crew members
router.post('/query', async (ctx) => {

});

// Create crew member
router.post('/', auth, async (ctx) => {

});

// Update crew member
router.put('/:id', auth, async (ctx) => {

});

// Delete crew member
router.delete('/:id', auth, async (ctx) => {

});

module.exports = router;
