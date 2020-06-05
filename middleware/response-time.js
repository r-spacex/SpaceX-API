/**
 * Return header with response time
 *
 * @param   {Object}    ctx   Koa context
 * @param   {Function}  next  Next middleware
 * @returns {Promise}
 */
module.exports = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('spacex-api-response-time', `${ms}ms`);
};
