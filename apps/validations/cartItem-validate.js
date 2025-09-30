const Joi = require('joi');

const cartItemCreateValidation = Joi.object({
  id_product:Joi.number().positive().required().messages({
    'number.base': 'Product must be a number',
    'number.positive': 'Product must be a positive number',
    'any.required': 'Product is required',
  }),
  quantity:Joi.number().positive().required().messages({
    'number.base': 'Quantity must be a number',
    'number.positive': 'Quantity must be a positive number',
    'any.required': 'Quantity is required',
  })
});

module.exports = {
  cartItemCreateValidation
}