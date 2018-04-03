
const Joi = require('joi');

const schema = Joi.object().keys({
  project_name: Joi.string().required(),
  version: Joi.string().required(),
  project_link: Joi.string().required(),
  organization: Joi.string().required(),
  organization_link: Joi.string().required(),
  description: Joi.string().required(),
});

const arraySchema = Joi.array().items(schema);

module.exports = arraySchema;
