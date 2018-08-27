
module.exports = {

  /**
   * Throw sample 500 error
   */
  five: async (ctx) => {
    ctx.throw(500, 'This is a sample 500 error');
  },

  /**
   * Throw sample 500 error
   */
  v1: async (ctx) => {
    ctx.body = 'v1 endpoint is deprecated. Did you mean v2?';
  },

};
