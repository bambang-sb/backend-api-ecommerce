const asyncHandler = require("../helpers/asyncHandler");
const Brand = require("../models/brand-model");
const {
  brandCreateUpdateValidation,
  brandIdValidation
} = require("../validations/brand-validate");
const validate = require("../validations/validate");

const read = asyncHandler(async (req, res) => {
  let brandes = await Brand.read();
  res.status(200).json({data:brandes});
});

const readId = asyncHandler(async (req, res) => {
  let brand = validate(brandIdValidation, {id:req.params.id});
  
  let brands = await Brand.readId(brand.id);
  res.status(200).json({data:brands});
});

const create = asyncHandler(async (req, res) => {
  const brand = validate(brandCreateUpdateValidation, req.body);

  let request = {
    name: brand.name,
    description: brand.description
  };

  await Brand.create(request);
  res.status(201).json({message:"Brand created successfully"});
});

const update = asyncHandler(async (req, res) => {
  let brand = validate(brandCreateUpdateValidation, req.body);
  let brandId = validate(brandIdValidation, {id:req.params.id});
  let request = {
    id_brand: brandId.id,
    name: brand.name,
    description: brand.description
  };
  let brands = await Brand.update(request);
  res.status(200).json({data:brands, message:"brand updated successfully"});
});

module.exports = {
  read,
  readId,
  create,
  update
}