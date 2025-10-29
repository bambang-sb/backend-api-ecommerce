const prismaClient = require('../applications/database')

const create =async (request)=>{
  await prismaClient.$transaction(async(tx)=>{
    let pd = await tx.products.create({data:{
      name: request.name,
      price: request.price,
      description: request.description,
      categori_id: request.category,
      brand_id: request.brand
    }})
    await tx.inventory.create({data:{product_id:Number(pd.id_product),stock:0}});
  });

  return;
}

const read =async ()=>{
  let res = await prismaClient.products.findMany({
    select:{
      id_product:true,
      name:true,
      description:true,
      price:true,
      categories:{
        select:{
          name:true
        }
      },
      brands:{
        select:{
          name:true
        }
      },
      productImages:{
        
        select:{
          image_url:true
        }
      }
    },
  });
  return res;
}

const readId =async (id)=>{
  let res = await prismaClient.products.findFirst({
    where:{
      id_product:id
    },
    select:{
      id_product:true,
      name:true,
      description:true,
      price:true,
      categories:{
        select:{
          name:true
        }
      },
      brands:{
        select:{
          name:true
        }
      },
      productImages:{
        
        select:{
          image_url:true
        }
      }
    },
  })
  return res;
}

const update =async (request)=>{
  let res = await prismaClient.products.update({
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
  return res;
}

const findName = async(name)=>{
  let res = await prismaClient.products.count({
    where:{
      name:name
    }
  });
  return res;
}
const findNameForUpdate = async(name,id)=>{
  let res = await prismaClient.products.count({
    where:{
      name:name,
      NOT:{
        id_product:Number(id)
      }
    },
  });
  return res;
}

const findByCategoriID = async(id)=>{
  let res = await prismaClient.products.findMany({
    where:{
      categori_id:id
    },
    select:{
      id_product:true,
      name:true,
      description:true,
      price:true,
      categories:{
        select:{
          name:true
        }
      },
      brands:{
        select:{
          name:true
        }
      },
      productImages:{
        
        select:{
          image_url:true
        }
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
  findNameForUpdate,
  findByCategoriID
}