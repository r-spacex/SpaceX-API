const Redis = require('ioredis');
const crypto = require('crypto');
const { logger } = require('./logger');

let redis;
let redisAvailable = false;

if (process.env.SPACEX_REDIS) {
  redis = new Redis(process.env.SPACEX_REDIS);
} else {
  redis = new Redis();
}

redis.on('error', () => {
  redisAvailable = false;
});
redis.on('end', () => {
  redisAvailable = false;
});
redis.on('ready', () => {
  redisAvailable = true;
  logger.info('Redis connected');
});
redis.on('reconnecting', () => {
  logger.info('Redis re-connecting');
});

/**
 * Hash func for redis keys
 *
 * @param   {String}    str    String to hash
 * @returns {String}  Hashed result
 */
const hash = (str) => crypto.createHash('sha1').update(str).digest('hex');

/**
 * Redis cache middleware
 *
 * @param   {Object}    ctx       Koa context
 * @param   {function}  next      Koa next function
 * @returns {void}
 */
module.exports.middleware = async (ctx, next) => {
  const { url, method } = ctx.request;
  const key = `spacex-cache:${hash(method)}:${hash(url)}:${hash(JSON.stringify(ctx.request.body))}`;

  if (!redisAvailable) {
    ctx.response.set('spacex-api-cache-online', 'false');
    await next();
    return;
  }
  ctx.response.set('spacex-api-cache-online', 'true');

  // Try and get cache
  if (ctx.request.method !== 'GET' || ctx.request.method !== 'POST') {
    let cached;
    try {
      cached = await redis.get(key);
      if (cached) {
        ctx.response.status = 200;
        ctx.response.set('spacex-api-cache', 'HIT');
        ctx.response.type = 'application/json';
        ctx.response.body = cached;
        cached = true;
      }
    } catch (e) {
      cached = false;
    }
    if (cached) {
      return;
    }
    await next();

    const ttl = ctx.state.cache;
    const responseBody = JSON.stringify(ctx.response.body);
    ctx.response.set('spacex-api-cache', 'MISS');

    // Set cache
    if (ctx.state.cache) {
      try {
        if ((ctx.response.status !== 200) || !responseBody) {
          return;
        }
        await redis.set(key, responseBody, 'EX', ttl);
      } catch (e) {
        console.log(`Failed to set cache: ${e.message}`);
      }
    }
  }
};

// Share redis connection
module.exports.redis = redis;
