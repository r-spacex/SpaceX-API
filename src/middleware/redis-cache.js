
const redis = require('node-redis');

module.exports = (opts = {}) => {
  let redisAvailable = false;

  const client = redis.createClient();

  client.on('error', () => {
    redisAvailable = false;
  });
  client.on('end', () => {
    redisAvailable = false;
  });
  client.on('connect', () => {
    redisAvailable = true;
  });

  const cache = async () => {};

  const getCache = async () => {};

  return async (ctx, next) => {
    if (!redisAvailable) {
      return next();
    }
    let cached;
    try {
      cached = await getCache();
    } catch (e) {
      cached = false;
    }
  };
};
