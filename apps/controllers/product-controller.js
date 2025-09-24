const asyncHandler = require("../helpers/asyncHandler");
const Product = require("../models/product-model");
const {
  ProductCreateUpdateValidation,
  ProductIdValidation
} = require("../validations/product-validate");
const validate = require("../validations/validate");

const read = asyncHandler(async (req, res) => {
  let product = await Product.read();
  res.status(200).json({data:product});
});

const readId = asyncHandler(async (req, res) => {
  let product = validate(ProductIdValidation, {id:req.params.id});
  
  let products = await Product.readId(product.id);
  res.status(200).json({data:products});
});

const create = asyncHandler(async (req, res) => {
  const product = validate(ProductCreateUpdateValidation, req.body);

  let request = {
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    brand: product.brand
  };

  await Product.create(request);
  res.status(201).json({message:"Product created successfully"});
});

const update = asyncHandler(async (req, res) => {
  let product = validate(ProductCreateUpdateValidation, req.body);
  let productId = validate(ProductIdValidation, {id:req.params.id});
  let request = {
    id_product: productId.id,
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    brand: product.brand
  };
  let products = await Product.update(request);
  res.status(200).json({data:products, message:"Product updated successfully"});
});

module.exports = {
  read,
  readId,
  create,
  update
}