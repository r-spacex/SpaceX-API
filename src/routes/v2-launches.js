// Launches Endpoints

const Router = require('koa-router');
const launches = require('../controllers/launches');

const v2 = new Router({
  prefix: '/v2/launches',
});

// Return most recent launch
v2.get('/latest', launches.latest);

// Return all past launches filtered by querystrings
v2.get('/', launches.past);

// Return all past and upcoming launches
v2.get('/all', launches.all);

module.exports = v2;
