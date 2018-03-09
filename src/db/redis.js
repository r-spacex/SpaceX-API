
/**
 * Creates redis connection + creates cache
 */

const redisClient = require('redis-connection')();

const cache = require('express-redis-cache')({
  client: redisClient,
  expire: 5000,
});

module.exports = cache;
