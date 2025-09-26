const prismaClient = require('../applications/database')

const create =async (request)=>{
  await prismaClient.brands.create({
    data:{
      name: request.name,
      description: request.description
    }
  })  
}

const read =async ()=>{
  return await prismaClient.brands.findMany()
}

const readId =async (id)=>{
  return await prismaClient.brands.findFirst({
    where:{
      id_brand:id
    }
  })
}

const update =async (request)=>{
  return await prismaClient.brands.update({
    where:{
      id_brand:request.id_brand
    },
    data:{
      name: request.name,
      description: request.description
    }
  })
}

module.exports = {
  create,
  read,
  readId,
  update
}