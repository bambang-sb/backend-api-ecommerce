const asyncHandler = require("../helpers/asyncHandler");
const User = require("../models/user-model");
const validate = require("../validations/validate");
const {
  reqisterUserValidation,
  loginUserValidation,
  usernameValidation
} = require("../validations/user-validate");
const ResponseError = require("../errors/response-error");
const bcrypt = require("bcrypt");

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
      message: "User created successfully",
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const login = validate(loginUserValidation, req.body);

  const user = await User.findUsername({username:login.username});
  if (!user) {
    throw new ResponseError(401, "Invalid username or password");
  }

  const isPassValid = await bcrypt.compare(login.password, user.password);
  if (!isPassValid) {
    throw new ResponseError(401, "Invalid username or password");
  }

  let token = await User.login(login);

  res.status(200).json({
    token: token,
    message: "User logged in successfully",
  });
});

const logout = asyncHandler(async (req, res) => {
  let username = req.user.username;
  const userValid = validate(usernameValidation, {username});

  const user = await User.findUsername({username:userValid.username});
  if (!user) {
    throw new ResponseError(401, "User not found");
  }

  await User.logout(userValid);

  res.status(200).json({
    message: "User logged out successfully",
  });
});

module.exports = {
  register,login,logout
};