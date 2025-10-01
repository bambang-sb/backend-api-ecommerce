const Order = require('../models/mongodb/order-model');
const Cart = require('../models/cart-model');
const Address = require('../models/address-model');
const validate = require('../validations/validate');
const {
  orderCreateValidation
} = require('../validations/order-validate');
const ResponseError = require('../errors/response-error');

const createOrder = async(req,id_user)=>{
  let valid = validate(orderCreateValidation,req);
  
  let dataCart = await Cart.readId(Number(id_user));
  let address = await Address.readId(Number(id_user));

  let subTotal=0,totalAmount=valid.total_amount;
  let orderStatus="pending";
  let ord={};
  let products=[];
  for(let res of dataCart ){

    products.push({
      id_product:res.product_id,
      name:res.products.name,
      price_order:Number(res.products.price),
      quantity:res.quantity,
      total:res.quantity*res.products.price
    });
    subTotal += res.quantity*res.products.price;
  }
  if(totalAmount < subTotal){
    throw new ResponseError(400,"Amount Minus !!");
  }
  let data = {
    id_user:id_user,
    order_status:orderStatus,
    total_amound:totalAmount,
    shipping_address:address.address_line+" "+address.city+" "+address.state+" "+address.city+" "+address.postal_code,
    dataProduct:products,
    sub_total:subTotal
  };
  let re = await Order.create(data)
  
  return data
}

module.exports = {
  createOrder
}