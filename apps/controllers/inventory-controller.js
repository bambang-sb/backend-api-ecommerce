const Inventory = require('../services/inventory-service');
const asyncHandler = require('../helpers/asyncHandler');

const read = asyncHandler(async(req,res)=>{
  let result = await Inventory.read();

  res.status(200).json({
    data:result
  })
});
const readId = asyncHandler(async(req,res)=>{
  let result = await Inventory.readId(req.params.id);

  res.status(200).json({
    data:result
  })
});

const updatePlus = asyncHandler(async(req,res)=>{
  //id inventory
  await Inventory.updatePlus(req.body,req.params.id);

  res.status(200).json({
    message:"Update Stock success"
  })
});


module.exports = {
  read,readId,updatePlus
}