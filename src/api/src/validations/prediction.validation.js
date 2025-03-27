const Joi = require('joi');

const feedback = {
  body: Joi.object().keys({
    predictionId: Joi.number().integer().required(),
    feedback: Joi.string().required(),
  }),
};

module.exports = {
  feedback,
};
