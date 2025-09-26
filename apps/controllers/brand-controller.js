const asyncHandler = require("../helpers/asyncHandler");
const BrandService = require("../services/brand-service");

const read = asyncHandler(async (req, res) => {
  let brandes = await BrandService.read();
  res.status(200).json({data:brandes});
});

const readId = asyncHandler(async (req, res) => {
  let result = await BrandService.readId(req.params);
  res.status(200).json({data:result});
});

const create = asyncHandler(async (req, res) => {
  await BrandService.create(req.body);
  res.status(201).json({message:"Brand created successfully"});
});

const update = asyncHandler(async (req, res) => {
  let result = await BrandService.update(req.body, req.params);
  res.status(200).json({data:result, message:"brand updated successfully"});
});

module.exports = {
  read,
  readId,
  create,
  update
}