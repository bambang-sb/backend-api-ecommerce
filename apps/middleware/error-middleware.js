const ResponseError = require("../errors/response-error");

const errorMiddleware = (err, req, res, next) => {

  if(!err) return next();

  if(err instanceof ResponseError){
    return res.status(err.status).json({
      message: err.message,
    }).end();
  }else{
    res.status(500).json({
      message: err.message,
    }).end();
  }
};



module.exports = errorMiddleware;