const mongoose = require('mongoose');

const db = mongoose.connection.useDb('auth');

/**
 * Authentication middleware
 */
module.exports = async (ctx, next) => {
  const key = ctx.request.headers['spacex-key'];
  if (key) {
    const user = await db.collection('users').findOne({ key });
    if (user && user.key === key) {
      ctx.state.role = user.role;
      await next();
      return;
    }
  }
  ctx.status = 401;
  ctx.body = 'https://youtu.be/RfiQYRn7fBg';
};
