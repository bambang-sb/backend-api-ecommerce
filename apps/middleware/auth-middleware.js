const prisma = require("../applications/database");
// require('dotenv').config()

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
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
        return res.status(401).json({ message: "Unauthorized" });
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
        return res.status(401).json({ message: "Unauthorized2" });
      }
  
      req.user = user; // Attach user info to request object
      next();
    }
  } catch (e) {
    next(e);
  }
}

module.exports = authMiddleware;