const bcrypt = require('bcrypt')
const prismaClient = require('../applications/database')
const { v4 } = require('uuid')

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

const login = async(request)=>{
  const token = v4().toString()
  const user = await prismaClient.users.update({
    where:{
      username: request.username
    },
    data:{
      token:token
    },
    select:{token:true}
  })

  return user
}

const logout = async(request)=>{
  
  const user = await prismaClient.users.update({
    where:{
      username: request.username
    },
    data:{
      token:null
    }
  })

  return user
}

module.exports = {
  register,
  findUsername,
  login,
  logout
}