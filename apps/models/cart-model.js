const prismaClient = require('../applications/database');

//create cart and cart item before have cart
const createAll = async(req,id_user)=>{
  await prismaClient.$transaction(async(tx)=>{
    let cart = await tx.carts.create({
      data:{
        user_id:id_user
      }
    });

    await tx.cartItems.create({
      data:{
        cart_id:cart.id_cart,
        product_id:req.id_product,
        quantity:req.quantity
      }
    });

    return true;

  });
}

//create cart item only, because have cart
const createCartItem = async(req,id_cart)=>{
  await prismaClient.cartItems.create({
    data:{
      cart_id:id_cart,
      product_id:req.id_product,
      quantity:req.quantity
    }
  });
  return true;
}

const readId = async(id_user)=>{
  let data = await prismaClient.cartItems.findMany({
    include:{
      carts:{
        select:{
          user_id:true,
          id_cart:true
        }
      },
      products:{
        select:{
          name:true,
          price:true,
          brands:{
            select:{
              name:true
            }
          },
          categories:{
            select:{
              name:true
            }
          }
        }
      }
    },
    where:{
      carts:{user_id:id_user}
    }
  });

  return data
}

const updateCartItem = async(req,id_cart_item)=>{
  await prismaClient.cartItems.update({
    where:{
      id_cart_item:id_cart_item,
    },
    data:{
      quantity:{
        increment:+ req.quantity}
    }
  });
  return true;
}

const deleteAfterOrder = async(id_cart)=>{
  await prismaClient.$transaction(async(tx)=>{
    //delete carti item by id cart
    await tx.cartItems.delete({
      where:{
        cart_id:id_cart
      }
    });

    //delete cart by id cart
    await tx.carts.delete({
      where:{
        id_cart:id_cart
      }
    });
  });

  return true
}

const cekCart = async(id_user)=>{
  let data = await prismaClient.carts.findFirst({
    where:{
      user_id:id_user
    },
    select:{
      id_cart:true
    }
  });
  return data;
}

const cekCartItem = async(id_cart,id_product)=>{
  let data = await prismaClient.cartItems.findFirst({
    where:{
      cart_id:id_cart,
      product_id:id_product
    },
    select:{
      id_cart_item:true
    }
  });
  return data;
}

const deleteCartAndItems = async (id_cart)=>{
  await prismaClient.$transaction(async(tx)=>{
    await tx.cartItems.deleteMany({
      where:{
        cart_id:id_cart
      }
    });

    await tx.carts.delete({
      where:{
        id_cart:id_cart
      }
    });

    return true;
  })
}

module.exports = {
  createAll,
  createCartItem,
  readId,
  updateCartItem,
  deleteAfterOrder,
  cekCart,
  cekCartItem,
  deleteCartAndItems
}