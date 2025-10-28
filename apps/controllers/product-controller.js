const asyncHandler = require("../helpers/asyncHandler");
const productService = require("../services/product-service");

const read = asyncHandler(async (req, res) => {
  let product = await productService.read();
  res.status(200).json({data:product});
});

const readId = asyncHandler(async (req, res) => {
  let result = await productService.readId(req.params);
  if(result == null) return res.status(404).json({data:result});
  res.status(200).json({data:result});
});

const create = asyncHandler(async (req, res) => {
  await productService.create(req.body);
  res.status(201).json({message:"Product created successfully"});
});

const update = asyncHandler(async (req, res) => {
  await productService.update(req.body, req.params);
  res.status(200).json({message:"Product updated successfully"});
});

module.exports = {
  read,
  readId,
  create,
  update
}