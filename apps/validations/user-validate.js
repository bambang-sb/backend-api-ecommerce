const Joi = require("joi")

const reqisterUserValidation = Joi.object({
  username: Joi.string().alphanum().min(3).max(50).required().messages({
    'any.required': 'Username is required',
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username should have a minimum length of {#limit}',
    'string.max': 'Username should have a maximum length of {#limit}',
    'string.alphanum': 'Username must only contain alpha-numeric characters'  
  }),
  password: Joi.string().max(100).required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
    'string.max': 'Password should have a maximum length of {#limit}',
  }),
})

const loginUserValidation = Joi.object({
  username: Joi.string().alphanum().min(3).max(50).required().messages({
    'any.required': 'Username is required',
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username should have a minimum length of {#limit}',
    'string.max': 'Username should have a maximum length of {#limit}',
    'string.alphanum': 'Username must only contain alpha-numeric characters'  
  }),
  password: Joi.string().max(100).required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
    'string.max': 'Password should have a maximum length of {#limit}',
  }),
})

const usernameValidation = Joi.object({
  username: Joi.string().alphanum().min(3).max(50).required().messages({
    'any.required': 'Username is required'
  }),
})

module.exports = {
  reqisterUserValidation,
  loginUserValidation,
  usernameValidation
}