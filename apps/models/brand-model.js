const prismaClient = require('../applications/database')

const create =async (request)=>{
  await prismaClient.brands.create({
    data:{
      name: request.name,
      description: request.description
    }
  })
  return null;
}

const findName = async(name)=>{
  let res = await prismaClient.brands.count({
    where:{
      name:name
    }
  });
  return res;
}
const findNameForUpdate = async(name,id)=>{
  let res = await prismaClient.brands.count({
    where:{
      name:name,
      NOT:{
        id_brand:Number(id)
      }
    },
  });
  return res;
}

const read =async ()=>{
  let res = await prismaClient.brands.findMany()
  return res;
}

const readId =async (id)=>{
  let res = await prismaClient.brands.findFirst({
    where:{
      id_brand:id
    }
  })
  return res;
}

const update =async (request)=>{
  let res = await prismaClient.brands.update({
    where:{
      id_brand:request.id_brand
    },
    data:{
      name: request.name,
      description: request.description
    }
  })
  return res;
}

module.exports = {
  create,
  read,
  readId,
  update,
  findName,
  findNameForUpdate
}