const Category = require("../models/categori-model");
const validate = require("../validations/validate");
const {
  categoryCreateUpdateValidation,
  categoriIdValidation
} = require("../validations/categori-validate");
const ResponseError = require("../errors/response-error");

const read = async () => {
  return await Category.read();
};

const readId = async (reqParam) => {
  let categori = validate(categoriIdValidation, {id:Number(reqParam.id)});
  
  let category = await Category.readId(categori.id);
  return category;
};

const create = async (request) => {
  const categori = validate(categoryCreateUpdateValidation, request);

  const cek = await Category.findName(categori.name);
  if(cek > 0){
    throw new ResponseError(409,`${categori.name} allready exists !!`);
  }

  await Category.create({
    name: categori.name,
    description: categori.description
  });

  return ;
};

const update = async (reqBody,{id}) => {
  let categori = validate(categoryCreateUpdateValidation, reqBody);
  let categoriId = validate(categoriIdValidation, {id:Number(id)});

  const cek = await Category.findNameForUpdate(categori.name,id);
  if(cek > 0){
    throw new ResponseError(409,`${categori.name} allready exists !!`);
  }

  let category = await Category.update({
    id_categori: categoriId.id,
    name: categori.name,
    description: categori.description
  });
  return {data:category, message:"Category updated successfully"};
};

module.exports = {
  read,
  readId,
  create,
  update
};