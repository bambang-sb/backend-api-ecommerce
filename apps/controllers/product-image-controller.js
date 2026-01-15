const asyncHandler = require('../helpers/asyncHandler');
const productImageService = require('../services/product-image-service');

const {successResponse,createdResponse,updatedResponse, errorResponse} = require("../helpers/response");

const read = asyncHandler(async(req,res)=>{
  let result = await productImageService.read();
  
  return successResponse(res,result);
});

const readId = asyncHandler(async(req,res)=>{
  let result = await productImageService.readId(req.params);

  return successResponse(res,result);
});

const create = asyncHandler(async(req,res)=>{
  
  if(!req.files){
    return errorResponse(res,'file not choice!',400);
  }
  await productImageService.create({product_id:Number(req.body.product_id)},req.files);
  
  return createdResponse(res);
});

const update = asyncHandler(async(req,res)=>{
  if(!req.file){
    return errorResponse(res,'file not choice!',400);
  }

  await productImageService.update(req.params,req.file,req.body)

  return updatedResponse(res);
})

const activeImage = asyncHandler(async(req,res)=>{
  
  await productImageService.activeImage(req.params)
  
  return updatedResponse(res)
})

const imageDelete = asyncHandler(async(req,res)=>{

  await productImageService.imageDelete(req.params,req.body);
  
  return updatedResponse(res)
})

module.exports = {
  read,readId, create, activeImage, update, imageDelete
}