/**
 * Error handler middleware
 *
 * @param   {Object}    ctx       Koa context
 * @param   {function}  next      Koa next function
 * @returns {void}
 */
module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.kind === 'ObjectId') {
      err.status = 404;
    } else {
      ctx.status = err.status || 500;
      ctx.body = err.message;
    }
  }
};
