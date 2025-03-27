const Joi = require('joi');
const xss = require('xss');
const { password } = require('./custom.validation');

const sanitizeInput = (value) => xss(value);

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email().custom(sanitizeInput).messages({
      'string.email': 'Invalid email format ',
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
    }),
    password: Joi.string().required().min(8).custom(password).messages({
      'string.min': 'Password must be at least 8 characters long',
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty',
    }),
    name: Joi.string().required().messages({
      'any.required': 'Name is required',
      'string.empty': 'Name cannot be empty',
    }),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().messages({
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty',
    }),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required().messages({
      'any.required': 'Token is required',
      'string.empty': 'Token cannot be empty',
    }),
  }),
};

const emailExist = {
  body: Joi.object().keys({
    email: Joi.string().required().email().custom(sanitizeInput).messages({
      'string.email': 'Invalid email format ',
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
    }),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  emailExist,
};
