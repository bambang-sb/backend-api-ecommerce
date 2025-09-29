const ResponseError = require('../errors/response-error');
const Inventory = require('../models/inventory-model');
// const validate = require('../validations/validate');
// const {inventoryCreateValidation} = require('../validations/inventory-validate');

const read = async()=>{
  
  let data = await Inventory.read();

  return data;
}
const readId = async(id_inventory)=>{
  
  let data = await Inventory.readId(Number(id_inventory));

  return data;
}

const updatePlus = async(req,id_inventory)=>{
  await Inventory.updatePlusStock(req,Number(id_inventory))

  return true;
}

const updateMinus = async(req,id_inventory)=>{
  let cekStock = await Inventory.cekStock(Number(id_inventory));

  if(cekStock.stock < req.stock){
    throw new ResponseError(400,"Inventory minus")
  }

  await Inventory.updateMinusStock(req,Number(id_inventory));

  return true;
}

module.exports = {
  read, readId, updatePlus, updateMinus
}