const Address = require('../services/address-service');
const asyncHandler = require("../helpers/asyncHandler");
const {successResponse,createdResponse,updatedResponse} = require("../helpers/response");

const read = asyncHandler(async(req,res)=>{
  //id = id user
  let result = await Address.read(req.params.id);
  return successResponse(res,result);
});

const create = asyncHandler(async(req,res)=>{
  await Address.create(req.body,req.params.id);

  return createdResponse(res);
});

const update = asyncHandler(async(req,res)=>{
  await Address.updateId(req.body,req.params.id);

  return updatedResponse(res)
});

module.exports = {
  read, create, update
}