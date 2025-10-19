const prismaClient = require('../applications/database');

const create = async(request)=>{
  await prismaClient.productImages.createMany({
    data:request
  });

  return true;
}

const read = async()=>{
  const data = await prismaClient.productImages.findMany({
    select:{
      id_image:true,
      product_id:true,
      image_url:true,
      is_primary:true,
      products:{
        select:{
          name:true
        }
      }
    }
  });

  return data;
}

const readId = async(id)=>{
  const data = await prismaClient.productImages.findFirst({
    where:{
      id_image:id
    },
    select:{
      id_image:true,
      image_url:true,
      products:{
        select:{
          name:true
        }
      }
    }
  });

  return data;
}

const activeImage = async(id)=>{
  await prismaClient.productImages.update({
    where:{
      id_image:id
    },
    data:{
      is_primary:true
    }
  });

  return true;
}

const update =async(id,req)=>{
  await prismaClient.productImages.update({
    where:{
      id_image:id
    },
    data:{
      image_url:req.image_url
    }
  });

  return true
}

const imageDelete =async(id)=>{
  await prismaClient.productImages.delete({
    where:{
      id_image:id
    }
  });

  return true;
}
module.exports = {
  create, read, readId, activeImage, update,imageDelete
}