
const Redis = require('ioredis');
const crypto = require('crypto');

/**
 * Redis caching middleware
 *
 * @returns {Function}
 */
module.exports = () => {
  let url;
  if (process.env.REDIS_URL) {
    url = process.env.REDIS_URL;
  } else {
    url = 'redis://127.0.0.1:6379';
  }

  let redisAvailable = false;
  const redis = new Redis(url);
  redis.on('error', () => {
    redisAvailable = false;
  });
  redis.on('end', () => {
    redisAvailable = false;
  });
  redis.on('connect', () => {
    redisAvailable = true;
  });

  /**
   * Koa middleware function
   *
   * @param   {Object}    ctx       Koa context
   * @param   {function}  next      Koa next function
   * @returns {void}
  */
  return async (ctx, next) => {
    await next();
  };
};
