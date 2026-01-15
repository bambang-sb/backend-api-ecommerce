const CartService = require('../services/cart-service');
const asyncHandler = require('../helpers/asyncHandler');
const {successResponse,createdResponse,updatedResponse} = require("../helpers/response");

const create = asyncHandler(async(req,res)=>{
  await CartService.create(req.body,req.user.id_user);

  return createdResponse(res);
});

const readId = asyncHandler(async(req,res)=>{
  let result = await CartService.readId(req.user.id_user);

  return successResponse(res,result);
});

const updateCartItem = asyncHandler(async(req,res)=>{
  await CartService.updateCartItem(req.body,req.params.id)

  return updatedResponse(res);
});

module.exports = {
  create,readId,updateCartItem
}