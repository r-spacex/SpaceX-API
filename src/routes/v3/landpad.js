// Landing Pad Endpoints

const Router = require('koa-router');
const landpads = require('../../controllers/v3/landpads');

const v3 = new Router({
  prefix: '/v3/landpads',
});

// Return all landpads
v3.get('/', landpads.all);

// Return one landpad
v3.get('/:id', landpads.one);

module.exports = v3;
