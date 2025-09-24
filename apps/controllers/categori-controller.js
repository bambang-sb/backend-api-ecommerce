const asyncHandler = require("../helpers/asyncHandler");
const Category = require("../models/categori-model");
const {
  categoryCreateUpdateValidation,
  categoriIdValidation
} = require("../validations/categori-validate");
const validate = require("../validations/validate");

const read = asyncHandler(async (req, res) => {
  let categories = await Category.read();
  res.status(200).json({data:categories});
});

const readId = asyncHandler(async (req, res) => {
  let categori = validate(categoriIdValidation, req.params);
  
  let category = await Category.readId(categori.id);
  res.status(200).json({data:category});
});

const create = asyncHandler(async (req, res) => {
  const categori = validate(categoryCreateUpdateValidation, req.body);

  let request = {
    name: categori.name,
    description: categori.description
  };

  await Category.create(request);
  res.status(201).json({message:"Category created successfully"});
});

const update = asyncHandler(async (req, res) => {
  let categori = validate(categoryCreateUpdateValidation, req.body);
  let categoriId = validate(categoriIdValidation, req.params);
  let request = {
    id_categori: categoriId.id,
    name: categori.name,
    description: categori.description
  };
  let category = await Category.update(request);
  res.status(200).json({data:category, message:"Category updated successfully"});
});

module.exports = {
  read,
  readId,
  create,
  update
}