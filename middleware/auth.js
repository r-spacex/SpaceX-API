/**
 * Check auth for mutating routes
 *
 * @param  {Object}    ctx   Koa context
 * @param  {Function}  next  Next middleware
 * @returns {Promise}
 */
module.exports = async (ctx, next) => {
  // Check if token exists
  if (ctx.request.headers['spacex-token']) {
    ctx.status = 200;
  } else {
    ctx.status = 401;
    ctx.body = 'https://youtu.be/RfiQYRn7fBg';
  }
  await next();
};
