
/**
 * Error handler middleware
 * @return {function} Koa Middleware
 */
module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    if (ctx.status === 404) {
      ctx.body = {
        error: 'Not Found',
      };
    } else {
      ctx.body = {
        error: 'Internal Server Error',
      };
    }
    ctx.app.emit('error', err, ctx);
  }
};
