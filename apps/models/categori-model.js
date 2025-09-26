const prismaClient = require('../applications/database')

const create =async (request)=>{
  await prismaClient.categories.create({
    data:{
      name: request.name,
      description: request.description
    }
  })
  return null;
}

const read =async (request)=>{
  let res = await prismaClient.categories.findMany()
  return res;
}

const readId =async (id)=>{
  let res = await prismaClient.categories.findFirst({
    where:{
      id_categori:id
    }
  })
  return res;
}

const update =async (request)=>{
  let res= await prismaClient.categories.update({
    where:{
      id_categori:request.id_categori
    },
    data:{
      name: request.name,
      description: request.description
    }
  })
  return res;
}

const findName = async(name)=>{
  let res = await prismaClient.categories.count({
    where:{
      name:name
    }
  });
  return res;
}
const findNameForUpdate = async(name,id)=>{
  let res = await prismaClient.categories.count({
    where:{
      name:name,
      NOT:{
        id_categori:Number(id)
      }
    },
  });
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