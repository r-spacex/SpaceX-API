/**
 * Add deprecation headers
 * @return {function} Koa Middleware
 */
module.exports = () => async (ctx, next) => {
  await next();
  ctx.set('Deprecation', 'Sat, 7 Nov 2020 00:00:00 GMT');
  ctx.set('Deprecation-Info', 'No new data updates past deprecation date');
};
