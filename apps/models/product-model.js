const prismaClient = require('../applications/database')

const create =async (request)=>{
  await prismaClient.products.create({
    data:{
      name: request.name,
      price: request.price,
      description: request.description,
      categori_id: request.category,
      brand_id: request.brand
    }
  })  
}

const read =async ()=>{
  return await prismaClient.products.findMany()
}

const readId =async (id)=>{
  return await prismaClient.products.findFirst({
    where:{
      id_product:id
    }
  })
}

const update =async (request)=>{
  return await prismaClient.products.update({
    where:{
      id_product:request.id_product
    },
    data:{
      name: request.name,
      price: request.price,
      description: request.description,
      categori_id: request.category,
      brand_id: request.brand
    }
  })
}

module.exports = {
  create,
  read,
  readId,
  update
}