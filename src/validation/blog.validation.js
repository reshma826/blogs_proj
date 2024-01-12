const Joi = require("joi");
const createBlog = {
  body: Joi.object().keys({
    blogType: Joi.string(),
    blogName: Joi.string().required(),
    blogContent: Joi.string().required(),
  }),
};

module.exports = { createBlog };
