
/**
 * List Redis cache times for individual routes
 */

const options = {
  routes: [{
    path: '/v2/launches(.*)',
    expire: 30,
  }, {
    path: '/v2/payloads(.*)',
    expire: 30,
  }, {
    path: '/v2/parts/(.*)',
    expire: 6000,
  }, {
    path: '/v2',
    expire: 86400,
  }, {
    path: '/v2/missions',
    expire: 86400,
  }, {
    path: '/v2/info',
    expire: 86400,
  }, {
    path: '/v2/info/history',
    expire: 86400,
  }, {
    path: '/v2/info/roadster',
    expire: 300,
  }, {
    path: '/v2/launchpads(.*)',
    expire: 86400,
  }, {
    path: '/v2/rockets(.*)',
    expire: 86400,
  }, {
    path: '/v2/capsules(.*)',
    expire: 86400,
  }, {
    path: '/v3',
    expire: 300,
  }, {
    path: '/v3/info',
    expire: 86400,
  }, {
    path: '/v3/capsules(.*)',
    expire: 6000,
  }, {
    path: '/v3/cores(.*)',
    expire: 6000,
  }, {
    path: '/v3/launchpads(.*)',
    expire: 6000,
  }, {
    path: '/v3/rockets(.*)',
    expire: 86400,
  }, {
    path: '/v3/launches(.*)',
    expire: 30,
  }, {
    path: '/v3/missions(.*)',
    expire: 86400,
  }, {
    path: '/v3/landpads(.*)',
    expire: 6000,
  }, {
    path: '/v3/roadster(.*)',
    expire: 300,
  }, {
    path: '/v3/payloads(.*)',
    expire: 300,
  }, {
    path: '/v3/history(.*)',
    expire: 86400,
  }, {
    path: '/v3/dragons(.*)',
    expire: 86400,
  }, {
    path: '/v3/ships(.*)',
    expire: 300,
  }],
  passParam: 'pretty',
};

module.exports = options;
