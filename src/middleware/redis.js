
const url = require('url');

/**
 * Declare options for Redis with remote server
 */

let options;

if (process.env.REDISCLOUD_URL) {
  const redisURL = url.parse(process.env.REDISCLOUD_URL);
  options = {
    routes: [{
      path: '/v2/launches',
      expire: 30,
    }, {
      path: '/v2/launches/(.*)',
      expire: 30,
    }, {
      path: '/v2/payloads',
      expire: 30,
    }, {
      path: '/v2/payloads/(.*)',
      expire: 30,
    }, {
      path: '/v2/parts/(.*)',
      expire: 6000,
    }, {
      path: '/v2',
      expire: 86400,
    }, {
      path: '/v2/info',
      expire: 86400,
    }, {
      path: '/v2/info/(.*)',
      expire: 300,
    }, {
      path: '/v2/launchpads/(.*)',
      expire: 86400,
    }, {
      path: '/v2/rockets/(.*)',
      expire: 86400,
    }, {
      path: '/v2/capsules/(.*)',
      expire: 86400,
    }],
    redis: {
      host: redisURL.hostname,
      port: redisURL.port,
      options: {
        password: redisURL.auth.split(':')[1],
      },
    },
  };
} else {
  options = {
    routes: [{
      path: '/v2/launches',
      expire: 30,
    }, {
      path: '/v2/launches/(.*)',
      expire: 30,
    }, {
      path: '/v2/payloads',
      expire: 30,
    }, {
      path: '/v2/payloads/(.*)',
      expire: 30,
    }, {
      path: '/v2/parts/(.*)',
      expire: 6000,
    }, {
      path: '/v2',
      expire: 86400,
    }, {
      path: '/v2/info',
      expire: 86400,
    }, {
      path: '/v2/info/(.*)',
      expire: 300,
    }, {
      path: '/v2/launchpads/(.*)',
      expire: 86400,
    }, {
      path: '/v2/rockets/(.*)',
      expire: 86400,
    }, {
      path: '/v2/capsules/(.*)',
      expire: 86400,
    }],
  };
}

module.exports = options;
