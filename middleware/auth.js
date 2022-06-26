import mongoose from 'mongoose';

const db = mongoose.connection.useDb('auth', { useCache: true });

/**
 * Authentication middleware
 */
export default async (ctx, next) => {
  const key = ctx.request.headers['spacex-key'];
  if (key) {
    const user = await db.collection('users').findOne({ key });
    if (user?.key === key) {
      ctx.state.roles = user.roles;
      await next();
      return;
    }
  }
  ctx.status = 401;
  ctx.body = 'https://youtu.be/RfiQYRn7fBg';
};
