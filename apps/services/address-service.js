const validate = require('../validations/validate');
const {
  addressCreateUpdateValidate
} = require('../validations/address-validate');
const Address = require('../models/address-model');

const create = async(req,id_user)=>{
  const addressValid = validate(addressCreateUpdateValidate,req);

  await Address.create(addressValid,id_user);

  return true;
}

const read = async(id_user)=>{
  let result = await Address.readId(id_user);

  return result;
}

const updateId = async(req,id_address)=>{
  const addressValid = validate(addressCreateUpdateValidate,req);

  await Address.updateId(addressValid,id_address);

  return true;
}

module.exports = {
  create, read, updateId
}