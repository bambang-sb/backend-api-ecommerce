const {db} = require('../../applications/mongodb');

const create = async(req)=>{
  await db().collection("orders").insertOne({
    user_id:req.id_user,
    order_status:req.order_status,
    total_amount:req.total_amound,
    shipping_address:req.shipping_address,
    createdAt:new Date(),
    updatedAt:"",
    product:req.dataProduct,
    sub_total:req.sub_total
  });

  return true;
}

module.exports = {create}