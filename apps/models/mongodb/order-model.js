const {db} = require('../../applications/mongodb');

const create = async(req)=>{
  let createOrder = await db().collection("orders").insertOne({
    user_id:req.id_user,
    order_status:req.order_status,
    total_amount:req.total_amound,
    shipping_address:req.shipping_address,
    createdAt:new Date(),
    updatedAt:"",
    product:req.dataProduct,
    sub_total:req.sub_total
  });

  return createOrder;
}

const readId = async(id_user)=>{
  let res = await db().collection('orders').find({
    user_id:id_user
  }).toArray();

  return res;
}

module.exports = {create,readId}