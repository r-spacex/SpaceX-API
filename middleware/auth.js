
const mongoose = require('mongoose');

const db = mongoose.connection.useDb('auth');

/**
 * Auth + Authz middleware
 *
 * @returns {Function}
 */
module.exports = (role) => async (ctx, next) => {
  const key = ctx.request.headers['spacex-key'];
  if (key) {
    const data = await db.collection('users').findOne({ key });
    if (data && data.key === key) {
      if (role) {
        if (data.roles && data.roles.includes(role)) {
          await next();
          return;
        }
      } else {
        await next();
        return;
      }
    }
  }
  ctx.status = 401;
  ctx.body = 'https://youtu.be/RfiQYRn7fBg';
};
