const Inventory = require('../services/inventory-service');
const asyncHandler = require('../helpers/asyncHandler');
const {successResponse,updatedResponse} = require("../helpers/response");

const read = asyncHandler(async(req,res)=>{
  let result = await Inventory.read();

  return successResponse(res,result);
});
const readId = asyncHandler(async(req,res)=>{
  let result = await Inventory.readId(req.params.id);

  return successResponse(res,result);
});

const updatePlus = asyncHandler(async(req,res)=>{
  //id inventory
  await Inventory.updatePlus(req.body,req.params.id);

  return updatedResponse(res);
});


module.exports = {
  read,readId,updatePlus
}