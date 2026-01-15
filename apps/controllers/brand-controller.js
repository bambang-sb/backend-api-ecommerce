const asyncHandler = require("../helpers/asyncHandler");
const BrandService = require("../services/brand-service");
const {successResponse,createdResponse,updatedResponse} = require("../helpers/response");

const read = asyncHandler(async (req, res) => {
  let brandes = await BrandService.read();
  return successResponse(res,brandes);
});

const readId = asyncHandler(async (req, res) => {
  let result = await BrandService.readId(req.params);
  return successResponse(res,result);
});

const create = asyncHandler(async (req, res) => {
  await BrandService.create(req.body);
  return createdResponse(res)
});

const update = asyncHandler(async (req, res) => {
  await BrandService.update(req.body, req.params);
  // res.status(200).json({data:result, message:"brand updated successfully"});
  return updatedResponse(res);
});

module.exports = {
  read,
  readId,
  create,
  update
}