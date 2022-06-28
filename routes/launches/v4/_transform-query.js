import _ from 'lodash';

/**
 * Transform V4 query into V5 query
 *
 * @param   {Object}    ctx       Koa context
 * @param   {function}  next      Koa next function
 * @returns {void}
 */
export default async (query) => {
  const transformed = query;

  if (query?.options?.populate) {
    if (Array.isArray(query.options.populate)) {
      query.options.populate.forEach((item, index) => {
        if (_.isObject(item)) {
          // Index is not user specified
          transformed.options.populate[index].path = transformed.options.populate?.[index]?.path?.replace('crew', 'crew.crew');
        }
      });
    }
    if (_.isObject(query.options.populate) && !Array.isArray(query.options.populate)) {
      transformed.options.populate.path = transformed.options.populate.path?.replace('crew', 'crew.crew');
    }
    if (_.isString(query.options.populate)) {
      transformed.options.populate = transformed.options.populate?.replace('crew', 'crew.crew');
    }
  }

  return transformed;
};
