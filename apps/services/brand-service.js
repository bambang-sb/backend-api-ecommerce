const ResponseError = require("../errors/response-error");
const Brand = require("../models/brand-model");
const {
  brandCreateUpdateValidation,
  brandIdValidation
} = require("../validations/brand-validate");
const validate = require("../validations/validate");

const read = async () => {
  let brands = await Brand.read();
  return brands;
};

const readId = async (reqParam) => {
  let brand = validate(brandIdValidation, {id:reqParam.id});
  let res = await Brand.readId(brand.id);
  return res;
};

const create = async (req) => {
  const brand = validate(brandCreateUpdateValidation, req);

  const cek = await Brand.findName(brand.name);
  if(cek > 0){
    throw new ResponseError(409,`${brand.name} allready exists !!`);
  }

  let request = {
    name: brand.name,
    description: brand.description
  };

  await Brand.create(request);
  return ;
};

const update = async (reqBody,{id}) => {
  let brand = validate(brandCreateUpdateValidation, reqBody);
  let brandId = validate(brandIdValidation, {id:id});

  let cek = await Brand.findNameForUpdate(brand.name,id);
  if(cek > 0){
    throw new ResponseError(409,`${brand.name} allready exists !!`);
  }

  let request = {
    id_brand: brandId.id,
    name: brand.name,
    description: brand.description
  };
  let brands = await Brand.update(request);

  return brands
};

module.exports = {
  read,
  readId,
  create,
  update
};