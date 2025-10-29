const validate = require('../validations/validate');
const {
  cartItemCreateValidation
} = require('../validations/cartItem-validate');
const Cart = require('../models/cart-model');
const ResponseError = require('../errors/response-error');

const create = async(req,id_user)=>{
  const valid = validate(cartItemCreateValidation,req);

  let cek = await Cart.cekCart(Number(id_user));
  
  //cart not empty
  if(cek != null){
    //cek cart item
    let cekItem = await Cart.cekCartItem(Number(cek.id_cart),Number(req.id_product));
    
    //cek cart item not empty
    if(cekItem != null){
      await Cart.updateCartItem(valid,cekItem.id_cart_item);
    }
    //cart item empty
    else{
      await Cart.createCartItem(valid,cek.id_cart);
    }
  }
  //cart empty
  else{
    //create cart and cart item
    await Cart.createAll(valid,Number(id_user));
  }
  
  return true;
}

const readId = async(id_user)=>{
  if(isNaN(id_user)){
    throw new ResponseError(404,"User not found");
  }
  const result = await Cart.readId(Number(id_user));

  return result;
}

const updateCartItem = async(req,id_product)=>{
  let valid = validate(cartItemCreateValidation,req);

  await Cart.updateCartItem(valid,Number(id_product));

  return true;
}

module.exports = {
  create,readId,updateCartItem
}