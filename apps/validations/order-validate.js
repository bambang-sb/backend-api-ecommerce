const Joi = require('joi');

const orderCreateValidation = Joi.object({
  total_amount:Joi.number().integer().positive().required().messages({
      'number.base': 'Total Amount must be a number',
      'number.positive': 'Total Amount must be a positive number',
      'any.required': 'Total Amount is required',
      'number.integer': 'Total must be an integer',
    })
});

module.exports = {
  orderCreateValidation
}