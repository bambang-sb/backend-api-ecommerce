const prisma = require("../applications/database");
// require('dotenv').config()
const {errorResponse} = require('../helpers/response');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return errorResponse(res,'Unauthorized',401);
  }

  try {
    //cek mode
    if(process.env.NODE_ENV === 'development'){
      req.user = {id_user:265,username:'test',token:'test'} // Attach user info to request object
      next();

    }else if(process.env.NODE_ENV === 'testing'){
      const user = await prisma.users.findFirst({
        where: {token: token },
        select: {id_user:true, username: true,token:true }
      });
      if (!user) {
        return errorResponse(res,'Unauthorized',401);
      }
  
      req.user = user; // Attach user info to request object
      next();
    }else{
      // Assuming you have a function to verify the token and get user info
      const user = await prisma.users.findFirst({
        where: { token: token },
        select: {id_user:true, username: true,token:true }
      });
      if (!user) {
        return errorResponse(res,'Unauthorized',401);
      }
  
      req.user = user; // Attach user info to request object
      next();
    }
  } catch (e) {
    next(e);
  }
}

module.exports = authMiddleware;