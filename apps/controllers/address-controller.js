const Address = require('../services/address-service');
const asyncHandler = require("../helpers/asyncHandler");

const read = asyncHandler(async(req,res)=>{
  //id = id user
  let result = await Address.read(req.params.id);
  res.status(200).json({
    data:result
  })
});

const create = asyncHandler(async(req,res)=>{
  await Address.create(req.body,req.params.id);

  res.status(200).json({
    message:"Create Address success"
  });
});

const update = asyncHandler(async(req,res)=>{
  await Address.updateId(req.body,req.params.id);

  res.status(200).json({
    message:"Update Address success"
  });
});

module.exports = {
  read, create, update
}