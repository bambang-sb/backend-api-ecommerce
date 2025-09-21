const asyncHandler = require("../helpers/asyncHandler");
const User = require("../models/user-model");
const validate = require("../validations/validate");
const {reqisterUserValidation} = require("../validations/user-validate");
const ResponseError = require("../errors/response-error");

const register = asyncHandler(async (req, res) => {
  const { username } = req.body;

  let users = validate(reqisterUserValidation, req.body);
   
  const userExists = await User.findUsername({ username });
  if (userExists) {
    throw new ResponseError(400,"User already exists");
  }

  const userCreate = await User.register(users);

  if (userCreate) {
    res.status(201).json({
      data:userCreate,
      message: "User created successfully",
    });
  }

});

module.exports = {
  register
};