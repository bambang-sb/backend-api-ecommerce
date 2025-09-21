const bcrypt = require('bcrypt')
const prismaClient = require('../applications/database')

const register = async(request)=>{
  request.password = await bcrypt.hash(request.password, 10)

  return prismaClient.users.create({
    data:{
      username: request.username,
      password: request.password
    }
  })
  
}
const findUsername = async({username})=>{
  return prismaClient.users.findUnique({
    where:{
      username: username
    }
  })
} 
module.exports = {
  register,
  findUsername
}