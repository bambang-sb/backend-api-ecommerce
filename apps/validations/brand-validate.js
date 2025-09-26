const Joi = require('joi');

const brandCreateUpdateValidation = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Brand name is required',
    'string.min': 'Brand name must be at least 2 characters',
    'string.max': 'Brand name must be at most 50 characters',
    'any.required': 'Brand name is required',
  }),
  description: Joi.string().max(255).allow(null, ''),
});

const brandIdValidation = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'Brand ID must be a number',
    'number.integer': 'Brand ID must be an integer',
    'number.positive': 'Brand ID must be a positive number',
    'any.required': 'Brand ID is required',
  }),
});

module.exports = {
  brandCreateUpdateValidation,
  brandIdValidation,
};