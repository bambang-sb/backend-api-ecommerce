const asyncHandler = require("../helpers/asyncHandler");
const userServices = require("../services/user-service");
const {successResponse,createdResponse,updatedResponse} = require("../helpers/response");

const register = asyncHandler(async (req, res) => {
  
  await userServices.register(req.body);

  return createdResponse(res);
});

const login = asyncHandler(async (req, res) => {
  
  let { userId,token } = await userServices.login(req.body);
  const data = {
    userId:userId,
    token: token
  }
  return successResponse(res,data);
});

const logout = asyncHandler(async (req, res) => {

  await userServices.logout(req.user);

  return updatedResponse(res);
});

module.exports = {
  register,login,logout
};