const prismaClient = require('../applications/database');

const create = async(req,id_user)=>{
  await prismaClient.addresses.create({
    data:{
      user_id:Number(id_user),
      address_line:req.address_line,
      city:req.city,
      state:req.state,
      postal_code:String(req.postal_code),
      country:req.country
    }
  })
}

const readId = async(id_user)=>{
  let result =  await prismaClient.addresses.findFirst({
    where:{
      user_id:Number(id_user)
    },
    select:{
      id_address:true,
      address_line:true,
      city:true,
      state:true,
      postal_code:true,
      country:true
    }
  });

  return result;
}

const updateId = async(req,id_address)=>{
  await prismaClient.addresses.update({
    where:{
      id_address:Number(id_address)
    },
    data:{
      address_line:req.address_line,
      city:req.city,
      state:req.state,
      postal_code:String(req.postal_code),
      country:req.country
    }
  });

  return true;
}

module.exports = {
  create, readId, updateId
}