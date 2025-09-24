const Joi = require('joi');

const ProductCreateUpdateValidation = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'any.required': 'Product name is required',
    'string.empty': 'Product name cannot be empty',
    'string.min': 'Product name should have a minimum length of {#limit}',
    'string.max': 'Product name should have a maximum length of {#limit}',
  }),
  price: Joi.number().positive().required().messages({
    'any.required': 'Price is required',
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be a positive number',
  }),
  description: Joi.string().max(500).optional().required().messages({
    'string.max': 'Description should have a maximum length of {#limit}',
    'any.required': 'Description is required',
    'string.empty': 'Description cannot be empty',
  }),
  category: Joi.number().required().messages({
    'any.required': 'Category is required',
    'string.empty': 'Category cannot be empty',
    'number.base': 'Category must be a number',
  }),
  brand: Joi.number().required().messages({
    'any.required': 'Brand is required',
    'string.empty': 'Brand cannot be empty',
    'number.base': 'Brand must be a number',
  }),
});

const ProductIdValidation = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'any.required': 'Product ID is required',
    'number.base': 'Product ID must be a number',
    'number.integer': 'Product ID must be an integer',
    'number.positive': 'Product ID must be a positive number',
  }),
});

module.exports = {
  ProductCreateUpdateValidation,
  ProductIdValidation
}; 