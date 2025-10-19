const Joi = require('joi');

const ProductImageCreateValidation = Joi.object({
  product_id:Joi.number().positive().required().messages({
    'any.required': 'Product is required',
    'number.base': 'Product must be a number',
    'number.positive': 'Product must be a positive number'
  })
});

const ProductImageIdValidation = Joi.object({
  id_image:Joi.number().positive().required().messages({
    'any.required': 'Image is required',
    'number.base': 'Image must be a number',
    'number.positive': 'Image must be a positive number'
  })
});

module.exports = {
  ProductImageCreateValidation,
  ProductImageIdValidation
}
