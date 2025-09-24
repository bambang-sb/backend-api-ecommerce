const prismaClient = require('../applications/database')

const create =async (request)=>{
  await prismaClient.categories.create({
    data:{
      name: request.name,
      description: request.description
    }
  })  
}

const read =async (request)=>{
  return await prismaClient.categories.findMany()
}

const readId =async (id)=>{
  return await prismaClient.categories.findFirst({
    where:{
      id_categori:id
    }
  })
}

const update =async (request)=>{
  return await prismaClient.categories.update({
    where:{
      id_categori:request.id_categori
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