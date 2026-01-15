const OrderService = require('../services/order-service');
const asyncHandler = require('../helpers/asyncHandler');
const {successResponse,createdResponse} = require("../helpers/response");

const create = asyncHandler(async(req,res)=>{
  await OrderService.createOrder(req.body,req.user.id_user)
  
  return createdResponse(res);
});

const readId = asyncHandler(async(req,res)=>{
  let result = await OrderService.readId(req.user.id_user)

  return successResponse(res,result);
})

module.exports = {
  create,
  readId
}