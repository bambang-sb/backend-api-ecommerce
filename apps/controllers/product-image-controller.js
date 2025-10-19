const asyncHandler = require('../helpers/asyncHandler');
const productImageService = require('../services/product-image-service');
const path = require('path');

const read = asyncHandler(async(req,res)=>{
  let result = await productImageService.read();
  res.status(200).json({
    data:result
  });
});

const readId = asyncHandler(async(req,res)=>{
  let result = await productImageService.readId(req.params);
  res.status(200).json({
    data:result
  });
});

const create = asyncHandler(async(req,res)=>{
  
  if(!req.files){
    return res.status(400).json({
      message:'file not choise.!!'
    })
  }
  await productImageService.create({product_id:Number(req.body.product_id)},req.files);
  res.status(200).json({
    message:'image success upload...'
  });
});

const update = asyncHandler(async(req,res)=>{
  if(!req.file){
    return res.status(400).json({
      message:'file not choise.!!'
    })
  }

  await productImageService.update(req.params,req.file,req.body)
  res.status(200).json({
    message:'Update image success...',
  });
})

const activeImage = asyncHandler(async(req,res)=>{
  
  await productImageService.activeImage(req.params)
  res.status(200).json({
    message:'Update active image success...'
  });
})

const imageDelete = asyncHandler(async(req,res)=>{

  await productImageService.imageDelete(req.params,req.body);
  res.status(200).json({
    message:'delete image success...',
  });
})

module.exports = {
  read,readId, create, activeImage, update, imageDelete
}