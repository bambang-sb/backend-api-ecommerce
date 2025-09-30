const CartService = require('../services/cart-service');
const asyncHandler = require('../helpers/asyncHandler');

const create = asyncHandler(async(req,res)=>{
  await CartService.create(req.body,req.user.id_user);

  res.status(200).json({
    message:"Cart create success"
  });
});

const readId = asyncHandler(async(req,res)=>{
  let result = await CartService.readId(req.user.id_user);

  res.status(200).json({
    data:result
  })
});

const updateCartItem = asyncHandler(async(req,res)=>{
  await CartService.updateCartItem(req.body,req.params.id)

  res.status(200).json({
    message:"Update Cart Success"
  });
});

module.exports = {
  create,readId,updateCartItem
}