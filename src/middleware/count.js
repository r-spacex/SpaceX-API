
/**
 * Total object count middleware
 * @return {function} Koa Middleware
 */
module.exports = () => async (ctx, next) => {
  await next();
  if (ctx.state.data) {
    const count = await ctx.state.data.count(false);
    ctx.set('spacex-api-count', count);
    ctx.state.count = count;
  }
};
