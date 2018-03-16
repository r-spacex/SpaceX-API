
const url = require('url');

/**
 * Declare options for Redis on Heroku
 */

let options;
if (process.env.REDISCLOUD_URL) {
  const redisURL = url.parse(process.env.REDISCLOUD_URL);
  options = {
    expire: 5000,
    redis: {
      host: redisURL.hostname,
      port: redisURL.port,
      options: {
        password: 'null' || redisURL.auth.split(':')[1],
      },
    },
  };
} else {
  options = {
    expire: 5000,
  };
}

module.exports = options;
