const Redis = require('ioredis');
const blake3 = require('blake3');
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

/**
 * BLAKE3 hash func for redis keys
 *
 * @param   {String}    str    String to hash
 * @returns {String}  Hashed result
 */
const hash = (str) => blake3.createHash().update(str).digest('hex');

/**
 * Redis cache middleware
 *
 * @param   {Number}    ttl       Cache TTL in seconds
 * @returns {void}
 */
module.exports = (ttl) => async (ctx, next) => {
  if (process.env.NODE_ENV !== 'production') {
    await next();
    return;
  }

  if (!redisAvailable) {
    ctx.response.set('spacex-api-cache-online', 'false');
    await next();
    return;
  }
  ctx.response.set('spacex-api-cache-online', 'true');

  const { url, method } = ctx.request;
  const key = `spacex-cache:${hash(`${method}${url}${JSON.stringify(ctx.request.body)}`)}`;

  if (ttl) {
    ctx.response.set('Cache-Control', `max-age=${ttl}`);
  } else {
    ctx.response.set('Cache-Control', 'no-store');
  }

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

    const responseBody = JSON.stringify(ctx.response.body);
    ctx.response.set('spacex-api-cache', 'MISS');

    // Set cache
    try {
      if ((ctx.response.status !== 200) || !responseBody) {
        return;
      }
      await redis.set(key, responseBody, 'EX', ttl);
    } catch (e) {
      console.log(`Failed to set cache: ${e.message}`);
    }
  }
};

// Share redis connection
Object.defineProperty(module.exports, 'redis', {
  value: redis,
  writable: false,
});
