const { newEnforcer } = require('casbin');

/**
 * Authorization middleware
 */
module.exports = async (ctx, next) => {
  const { role } = ctx.state;
  const { path, method } = ctx;
  const enforcer = await newEnforcer(`${__dirname}/model.conf`, `${__dirname}/policy.csv`);
  const allowed = await enforcer.enforce(role, path, method);
  if (allowed) {
    await next();
    return;
  }
  ctx.status = 403;
};
