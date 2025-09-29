const Joi = require('joi');

const inventoryCreateValidation = Joi.object({
  product_id: Joi.number().integer().positive().required().messages({
      'any.required': 'Product is required',
      'number.base': 'Product must be a number',
      'number.integer': 'Product must be an integer',
      'number.positive': 'Product must be a positive number',
  }),
  stock:Joi.number().integer().positive().required().messages({
      'any.required': 'Stock is required',
      'number.base': 'Stock must be a number',
      'number.integer': 'Stock must be an integer',
      'number.positive': 'Stock must be a positive number',
  }),
})



module.exports = {
  inventoryCreateValidation
}