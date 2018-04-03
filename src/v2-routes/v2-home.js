// API Info Endpoint

const Router = require('koa-router');
const Joi = require('joi');
const schema = require('../validators/home');

const v2 = new Router({
  prefix: '/v2',
});

// Returns API info
v2.get('/', async (ctx) => {
  const data = await global.db
    .collection('home')
    .find({})
    .project({ _id: 0 })
    .toArray();
  const result = Joi.validate(data, schema);
  if (result.error === null) {
    ctx.body = result.value[0];
  } else {
    ctx.body = data[0];
  }
});

module.exports = v2;
