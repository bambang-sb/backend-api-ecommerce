const prismaClient = require('../applications/database')

// const create = async(request)=>{
//   await prismaClient.inventory.create({
//     data:{
//       product_id:request.product_id,
//       stock:request.stock
//     }
//   })
//   return true;
// }

const read = async()=>{
  let res = await prismaClient.inventory.findMany({
    
    include:{
      products:{
        select:{
          name:true,
          price:true,
          description:true,
          brands:{
            select:{
              name:true
            }
          },
          categories:{
            select:{
              name:true
            }
          }
        }
      }
    },
  })
  return res;
}

const readId = async(id_inventory)=>{
  let res = await prismaClient.inventory.findFirst({
    include:{
      products:{
        select:{
          name:true,
          price:true,
          description:true,
          brands:{
            select:{
              name:true
            }
          },
          categories:{
            select:{
              name:true
            }
          }
        }
      }
    },
    where:{
      id_inventory:id_inventory
    }
  })
  return res;
}

const updatePlusStock = async(requset,id_inventory)=>{
  await prismaClient.inventory.update({
    where:{
      id_inventory:id_inventory
    },
    data:{
      stock:{
        increment:+requset.stock
      }
    }
  })

  return true;
}

const updateMinusStock = async(requset,id_inventory)=>{
  await prismaClient.inventory.update({
    where:{
      id_inventory:id_inventory
    },
    data:{
      stock:{
        increment:-requset.stock
      }
    }
  })

  return true;
}

const cekStock = async(id_inventory)=>{
  let data = await prismaClient.inventory.findFirst({
    where:{
      id_inventory:id_inventory
    }
  });

  return data;
}

module.exports ={
  read,
  readId,
  updatePlusStock,
  updateMinusStock,
  cekStock
}