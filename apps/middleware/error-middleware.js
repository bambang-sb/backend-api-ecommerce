
const multer = require('multer')
const { Prisma } = require("@prisma/client");
const ResponseError = require("../errors/response-error");

const errorMiddleware = (err, req, res, next) => {

  if(!err) return next();
  
  if(err instanceof ResponseError){
    return res.status(err.status).json({
      message: err.message,
    }).end();
  }
  else if(err instanceof multer.MulterError){//multer error file upload limit
    if(err.code === 'LIMIT_UNEXPECTED_FILE'){
      res.status(400).json({
        message: 'max upload 3 file',
      }).end();
    }else{
      res.status(400).json({
        message: 'something upload file error',
      }).end();
    }
  }
  else if(err instanceof Prisma.PrismaClientKnownRequestError){//prisma error
    if(err.code){
      let val = prismaError(err.code);
      return res.status(val.status).json({message:val.message});
    }else{
      res.status(400).json({
        message: err.meta.cause,
      }).end();
    }
  }else if(err instanceof Prisma.PrismaClientValidationError){//prisma error
    res.status(400).json({
      message: err.message.split('\n').map(line => line.trim()).filter(line => line.length > 0),
    }).end();
  }else{
    res.status(500).json({
      message: err.message,
    }).end();
  }
};

const prismaError = (code)=>{
  let st=400,ms='prisma something wrong';
  if(code == 'P2003'){
    st=400;
    ms="Product not found"
    return{status:st,message:ms}
  }
  return{status:st,message:ms}
}

module.exports = errorMiddleware;