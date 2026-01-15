
const multer = require('multer')
const { Prisma } = require("@prisma/client");
const ResponseError = require("../errors/response-error");
const {errorResponse} = require('../helpers/response');

const errorMiddleware = (err, req, res, next) => {

  if(!err) return next();
  
  if(err instanceof ResponseError){
    return errorResponse(res,err.message,err.status);
  }
  else if(err instanceof multer.MulterError){//multer error file upload limit
    if(err.code === 'LIMIT_UNEXPECTED_FILE'){
      return errorResponse(res,'max upload 3 file',400);
    }else{
      return errorResponse(res,'something upload file error',400);
      
    }
  }
  else if(err instanceof Prisma.PrismaClientKnownRequestError){//prisma error
    if(err.code){
      let val = prismaError(err);
      return errorResponse(res,val.message,val.status);
    }else{
      return errorResponse(res,err.meta.cause,400);
    }
  }else if(err instanceof Prisma.PrismaClientValidationError){//prisma error
    
    return errorResponse(
      res,
      err.message.split('\n').map(line => line.trim()).filter(line => line.length > 0),
      400
    );
  }else{
    errorResponse(res,err.message,500);
  }
};

const prismaError = (err)=>{
  let st=400,ms='prisma somethong wrong';
  if(err.code == 'P2003'){
    st=400;
    return{status:st,message:err.message}
  }else if(err.code == 'P2025'){
    st=404;
    return{status:st,message:err.meta.cause}
  }else{
    return{status:st,message:ms}
  }
}

module.exports = errorMiddleware;