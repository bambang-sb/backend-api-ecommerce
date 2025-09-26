const asyncHandler = require("../helpers/asyncHandler");
const categoriService = require("../services/categori-service");

const read = asyncHandler(async (req, res) => {
  let result = await categoriService.read();
  res.status(200).json({data:result});
});

const readId = asyncHandler(async (req, res) => {
  let result = await categoriService.readId(req.params);
  res.status(200).json({data:result});
});

const create = asyncHandler(async (req, res) => {
  await categoriService.create(req.body);
  res.status(201).json({message:"Category created successfully"});
});

const update = asyncHandler(async (req, res) => {
  await categoriService.update(req.body, req.params);
  res.status(200).json({message:"Category updated successfully"});
});

module.exports = {
  read,
  readId,
  create,
  update
}