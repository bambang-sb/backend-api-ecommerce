const OrderService = require('../services/order-service');
const asyncHandler = require('../helpers/asyncHandler');

const create = asyncHandler(async(req,res)=>{
  let result = await OrderService.createOrder(req.body,req.user.id_user)
  res.status(200).json({
    message:"Order create success",
    data:result
  });
});

module.exports = {
  create
}