
module.exports = {

  /**
   * Throw sample 500 error
   */
  five: async (ctx) => {
    ctx.throw(500, 'This is a sample 500 error');
  },

};
