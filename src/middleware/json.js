
const isJSON = require('koa-is-json');

/**
 * Pretty JSON response middleware.
 *
 *  - `pretty` default to pretty response [true]
 *  - `param` optional query-string param for pretty responses [none]
 *
 * @param {Object} opts
 * @return {GeneratorFunction}
 * @api public
 */
module.exports = (opts = {}) => {
  const { param } = opts;
  const pretty = opts.pretty === false ? true : opts.pretty;
  const spaces = opts.spaces || 2;

  return (ctx, next) => next().then(() => {
    const { body } = ctx;
    const json = isJSON(body);
    if (!json) return;

    // query
    const hasParam = param.pretty === true && ctx.query.pretty === 'true';
    const prettify = pretty && hasParam;

    // prettify JSON responses
    if (json && prettify) {
      ctx.body = JSON.stringify(body, null, spaces);
    }
  });
};
