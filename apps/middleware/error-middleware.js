

const { Prisma } = require("@prisma/client");
const ResponseError = require("../errors/response-error");

const errorMiddleware = (err, req, res, next) => {

  if(!err) return next();

  if(err instanceof ResponseError){
    return res.status(err.status).json({
      message: err.message,
    }).end();
  }else if(err instanceof Prisma.PrismaClientKnownRequestError){
    res.status(404).json({
      message: err.meta.cause,
    }).end();
  }else if(err instanceof Prisma.PrismaClientValidationError){
    res.status(404).json({
      message: err.message.split('\n').map(line => line.trim()).filter(line => line.length > 0),
    }).end();
  }else{
    res.status(500).json({
      message: err.message,
    }).end();
  }
};



module.exports = errorMiddleware;