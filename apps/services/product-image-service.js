const ProductImage = require('../models/product-image-model');
const validate = require('../validations/validate');
const {
  ProductImageCreateValidation,
  ProductImageIdValidation
} = require('../validations/product-image-vlidate');
const {deleteOldImage} = require('../helpers/uploadfile');
const ResponseError = require('../errors/response-error');

const read = async()=>{
  let res = await ProductImage.read();

  return res;
}

const readId = async({id})=>{
  let valid = validate(ProductImageIdValidation,{id_image:Number(id)});
  let res = await ProductImage.readId(valid.id_image);

  return res;
}

const create = async(req,files)=>{
  let valid = validate(ProductImageCreateValidation,req);

  //const imagePath = '/uploads/'+req.file.filename;
  let dataTemp = [];
  files.map((val)=>{
    dataTemp.push({
      product_id:valid.product_id,
      image_url:val.filename,
      is_primary:false
    })
  })

  await ProductImage.create(dataTemp);
  return true;
}

const update = async(req,file,body)=>{
  const valid = validate(ProductImageIdValidation,{id_image:Number(req.id)})
  deleteOldImage(body.old_image);
  await ProductImage.update(valid.id_image,{image_url:file.filename});
  return true;
}

const activeImage = async(req)=>{
  let valid = validate(ProductImageIdValidation,{id_image:Number(req.id)})

  await ProductImage.activeImage(valid.id_image);
  return true;
}

const imageDelete = async({id},{old_image})=>{
  let valid = validate(ProductImageIdValidation,{id_image:Number(id)});
  let res = await ProductImage.imageDelete(valid.id_image);
  if(res){
    deleteOldImage(old_image)
    return res;
  }
  // throw new ResponseError(400,'delete image failed !!!')
}
module.exports = {
  read,readId, create, activeImage, update,imageDelete
}