const Joi = require('joi');
const xss = require('xss');
const { password } = require('./custom.validation');

const updateYou = {
  body: Joi.object().keys({
    old_password: Joi.string(),
    new_password: Joi.string().custom(password),
    name: Joi.string(),
  }),
};

module.exports = {
  updateYou,
};
