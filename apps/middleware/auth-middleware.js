const prisma = require("../applications/database");
// require('dotenv').config()

const authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    //cek mode
    if(process.env.NODE_ENV === 'development'){
      req.user = {username:'test',token:'test'} // Attach user info to request object
      next();

    }else{
      // Assuming you have a function to verify the token and get user info
      const user = await prisma.users.findFirst({
        where: { token: req.headers.authorization },
        select: { username: true,token:true }
      });
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      req.user = user; // Attach user info to request object
      next();
    }
  } catch (e) {
    next(e);
  }
}

module.exports = authMiddleware;