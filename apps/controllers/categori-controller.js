const asyncHandler = require("../helpers/asyncHandler");
const categoriService = require("../services/categori-service");
const {successResponse,createdResponse,updatedResponse} = require("../helpers/response");

const read = asyncHandler(async (req, res) => {
  let result = await categoriService.read();
  
  return successResponse(res,result);
});

const readId = asyncHandler(async (req, res) => {
  let result = await categoriService.readId(req.params);
  
  return successResponse(res,result);
});

const create = asyncHandler(async (req, res) => {
  await categoriService.create(req.body);
  
  return createdResponse(res);
});

const update = asyncHandler(async (req, res) => {
  await categoriService.update(req.body, req.params);
  
  return updatedResponse(res);
});

module.exports = {
  read,
  readId,
  create,
  update
}