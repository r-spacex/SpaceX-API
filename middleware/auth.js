
const mongoose = require('mongoose');

const db = mongoose.connection.useDb('auth');

/**
 * Check auth for destructive routes
 *
 * @param  {Object}    ctx   Koa context
 * @param  {Function}  next  Next middleware
 * @returns {Promise}
 */
module.exports = async (ctx, next) => {
  const key = ctx.request.headers['spacex-key'];
  if (key) {
    const data = await db.collection('users').findOne({ key });
    if (data && data.key === key) {
      await next();
      return;
    }
  }
  ctx.status = 401;
  ctx.body = 'https://youtu.be/RfiQYRn7fBg';
};
