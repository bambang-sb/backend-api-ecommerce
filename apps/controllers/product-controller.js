const asyncHandler = require("../helpers/asyncHandler");
const productService = require("../services/product-service");
const {successResponse,createdResponse,updatedResponse,errorResponse} = require("../helpers/response");

const read = asyncHandler(async (req, res) => {
  let product = await productService.read();
  
  return successResponse(res,product);
});

const readId = asyncHandler(async (req, res) => {
  let result = await productService.readId(req.params);
  if(result == null) return errorResponse(res,'not found!');
  
  return successResponse(res,result);
});

const create = asyncHandler(async (req, res) => {
  await productService.create(req.body);
  
  return createdResponse(res);
});

const update = asyncHandler(async (req, res) => {
  await productService.update(req.body, req.params);
  
  return updatedResponse(res);
});

const productByCategori = asyncHandler(async(req,res)=>{
  let result = await productService.findByCategoriID(req.params);
  if(result.length == 0) return errorResponse(res,'Not found!',404);
  
  return successResponse(res,result);
})
module.exports = {
  read,
  readId,
  create,
  update,
  productByCategori
}