
module.exports = {

  /**
   * Set header with response times
   */
  responseTime: async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  },

};
