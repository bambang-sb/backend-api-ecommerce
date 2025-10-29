const ResponseError = require("../errors/response-error");
const Product = require("../models/product-model");
const {
  ProductCreateUpdateValidation,
  ProductIdValidation,
  ProductCategoriIdValidation
} = require("../validations/product-validate");
const validate = require("../validations/validate");

const read = async () => {
  let res =  await Product.read();
  return res;
};

const readId = async ({id}) => {
  let product = validate(ProductIdValidation, {id:Number(id)});
  
  let res = await Product.readId(product.id);
  return res;
};

const create = async (req) => {
  const product = validate(ProductCreateUpdateValidation, req);

  const cek = await Product.findName(product.name);
    if(cek > 0){
      throw new ResponseError(409,`${product.name} allready exists !!`);
    }

  let request = {
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    brand: product.brand
  };

  await Product.create(request);
  return;
};

const update = async (req,{id}) => {
  let product = validate(ProductCreateUpdateValidation, req);
  let productId = validate(ProductIdValidation, {id:Number(id)});

  const cek = await Product.findNameForUpdate(product.name,id);
    if(cek > 0){
      throw new ResponseError(409,`${product.name} allready exists !!`);
    }

  let request = {
    id_product: productId.id,
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    brand: product.brand
  };

  await Product.update(request);
  
  return;
};

const findByCategoriID = async({id})=>{
  let valid = validate(ProductCategoriIdValidation,{id:Number(id)});

  let res = await Product.findByCategoriID(valid.id);
  
  return res;
}

module.exports = {
  read,
  readId,
  create,
  update,
  findByCategoriID
};