
const pathToRegExp = require('path-to-regexp');
const Redis = require('ioredis');
const crypto = require('crypto');

/**
 * Koa middleware for redis body caching + setting count header
 *
 * @param   {Object}    opts     Config options
 * @returns {Function}  Koa middleware function
*/
module.exports = (opts = {}) => {
  const {
    expire = 30 * 60,
    routes = ['(.*)'],
    passParam = '',
  } = opts;

  let redisUrl;
  if (process.env.REDIS_URL) {
    redisUrl = process.env.REDIS_URL;
  } else if (process.env.DOCKER) {
    redisUrl = 'redis://redis:6379';
  } else {
    redisUrl = 'redis://localhost:6379';
  }

  let redisAvailable = false;
  const redis = new Redis(redisUrl);
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
   * Get cache for body, type, and count
   *
   * @param   {Object}    ctx     Koa context
   * @param   {String}    key     Cached body key
   * @param   {String}    tkey    Cached type key
   * @param   {String}    ckey    Cached count key
   * @returns {String}  Cached text or JSON
  */
  const getCache = async (ctx, key, tkey, ckey) => {
    const value = await redis.get(key);
    const count = await redis.get(ckey);
    let type;
    let cached = false;

    if (value) {
      ctx.response.status = 200;
      type = (await redis.get(tkey)) || 'text/html';
      ctx.response.set('spacex-api-cache', 'HIT');
      ctx.response.type = type;
      ctx.response.body = value;
      cached = true;
    }
    if (count) {
      ctx.response.set('spacex-api-count', count);
    }

    return cached;
  };

  /**
   * Get cache for body, type, and count
   *
   * @param   {Object}    ctx       Koa context
   * @param   {String}    tkey      Cached type key
   * @param   {Number}    expire    Expire time in seconds
   * @returns {String}  Cached text or JSON
  */
  const cacheType = async (ctx, tkey, typeExpire) => {
    const { type } = ctx.response;
    if (type) {
      await redis.set(tkey, type, 'EX', typeExpire);
    }
  };

  /**
   * Get cache for body, type, and count
   *
   * @param   {Object}    ctx       Koa context
   * @param   {String}    ckey      Cached count key
   * @param   {Number}    expire    Expire time in seconds
   * @returns {String}  Cached text or JSON
  */
  const cacheCount = async (ctx, ckey, countExpire) => {
    const { count } = ctx.state;
    if (count) {
      await redis.set(ckey, count, 'EX', countExpire);
    }
  };

  /**
   * Get cache for body, type, and count
   *
   * @param   {Object}    ctx     Koa context
   * @param   {String}    key     Cached body key
   * @param   {String}    tkey    Cached type key
   * @param   {String}    ckey    Cached count key
   * @param   {Number}    expire    Expire time in seconds
   * @returns {String}  Cached text or JSON
  */
  const cache = async (ctx, key, tkey, ckey, cacheExpire) => {
    let { body } = ctx.response;

    if ((ctx.request.method !== 'GET') || (ctx.response.status !== 200) || !body) {
      return;
    }

    if (typeof body === 'string') {
      await redis.set(key, body, 'EX', cacheExpire);
    } else if (typeof body === 'object' && ctx.response.type === 'application/json') {
      body = JSON.stringify(body);
      await redis.set(key, body, 'EX', cacheExpire);
    } else {
      return;
    }

    await cacheType(ctx, tkey, cacheExpire);
    await cacheCount(ctx, ckey, cacheExpire);
    ctx.response.set('spacex-api-cache', 'MISS');
  };

  /**
   * Hash func for redis keys
   *
   * @param   {String}    str       String to hash
   * @returns {String}  Hashed result
  */
  const hash = (str) => crypto.createHash('sha1').update(str).digest('hex');

  /**
   * Match routes with a regexp
   *
   * @param   {String}    route     Route from opts
   * @param   {String}    path      Current request path
   * @returns {Boolean}  Match or nah
  */
  const paired = (route, path) => {
    const options = {
      sensitive: true,
      strict: true,
    };
    return pathToRegExp(route, [], options).exec(path);
  };

  /**
   * Koa middleware function
   *
   * @param   {Object}    ctx       Koa context
   * @param   {function}  next      Koa next function
   * @returns {void}
  */
  return async (ctx, next) => {
    const { url, path } = ctx.request;
    const key = `redis-cache:${hash(url)}`;
    const tkey = `${key}:type`;
    const ckey = `${key}:count`;
    let match = false;
    let routeExpire = false;

    // Check if routes match
    for (let i = 0; i < routes.length; i += 1) {
      let route = routes[i];

      if (typeof routes[i] === 'object') {
        route = routes[i].path;
        routeExpire = routes[i].expire;
      }

      if (paired(route, path)) {
        match = true;
        break;
      }
    }

    // Check redis status
    if (!redisAvailable || !match || (passParam && ctx.request.query[passParam])) {
      await next();
      return;
    }

    // Try and get cache
    let cached;
    try {
      cached = await getCache(ctx, key, tkey, ckey);
    } catch (e) {
      cached = false;
    }
    if (cached) {
      return;
    }
    await next();

    // Set cache
    try {
      const trueExpire = routeExpire || expire;
      await cache(ctx, key, tkey, ckey, trueExpire);
    } catch (e) {
      console.log('Failed to set cache');
    }
  };
};
