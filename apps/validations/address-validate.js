const Joi = require('joi');

const addressCreateUpdateValidate = Joi.object({
  address_line:Joi.string().min(10).max(255).required().messages({
    'string.empty': 'Address line is required',
    'string.min': 'Address line must be at least 10 characters',
    'string.max': 'Address line must be at most 255 characters',
    'any.required': 'Address line is required',
  }),
  city:Joi.string().min(4).max(50).required().messages({
    'string.empty': 'City line is required',
    'string.min': 'City line must be at least 4 characters',
    'string.max': 'City line must be at most 50 characters',
    'any.required': 'City line is required',
  }),
  state:Joi.string().min(4).max(50).required().messages({
    'string.empty': 'State is required',
    'string.min': 'State must be at least 4 characters',
    'string.max': 'State must be at most 50 characters',
    'any.required': 'State is required',
  }),
  postal_code:Joi.number().integer().positive().max(99999).required().messages({
    'number.base': 'Postal Code must be a number',
    'number.integer': 'Postal Code must be an integer',
    'number.positive': 'Postal Code must be a positive number',
    'any.required': 'Postal Code is required',
    'number.max': 'Postal Code must be at most 6 characters'
  }),
  country:Joi.string().min(4).max(50).required().messages({
    'string.empty': 'Country is required',
    'string.min': 'Country must be at least 4 characters',
    'string.max': 'Country must be at most 50 characters',
    'any.required': 'Country is required',
  }),
});

module.exports = {
  addressCreateUpdateValidate
}