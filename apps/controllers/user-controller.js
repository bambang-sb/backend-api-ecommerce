const asyncHandler = require("../helpers/asyncHandler");
const userServices = require("../services/user-service");

const register = asyncHandler(async (req, res) => {
  
  await userServices.register(req.body);

  res.status(201).json({
    message: "User created successfully",
  });
  
});

const login = asyncHandler(async (req, res) => {
  
  let { userId,token } = await userServices.login(req.body);
  res.status(200).json({
    userId:userId,
    token: token,
    message: "User logged in successfully",
  });
});

const logout = asyncHandler(async (req, res) => {

  await userServices.logout(req.user);

  res.status(200).json({
    message: "User logged out successfully",
  });
});

module.exports = {
  register,login,logout
};