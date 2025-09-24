const Joi = require("joi")

const categoryCreateUpdateValidation = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'any.required': 'Category name is required',
    'string.empty': 'Category name cannot be empty',
    'string.min': 'Category name should have a minimum length of {#limit}',
    'string.max': 'Category name should have a maximum length of {#limit}',
  }),
  description:Joi.string().min(10).max(300).required().messages({
    'any.required': 'Category description is required',
    'string.empty': 'Category description cannot be empty',
    'string.min': 'Category description should have a minimum length of {#limit}',
    'string.max': 'Category description should have a maximum length of {#limit}',
  }),
})
const categoriIdValidation = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'any.required': 'Category ID is required',
    'number.base': 'Category ID must be a number',
    'number.integer': 'Category ID must be an integer',
    'number.positive': 'Category ID must be a positive number',
  }),
})  
module.exports = {
  categoryCreateUpdateValidation,
  categoriIdValidation
}