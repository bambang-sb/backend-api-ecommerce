const successResponse = (res,data=[],msg='success',statusCode=200)=>{
  return res.status(statusCode).json({
    message:msg,
    data:data
  });
}

const createdResponse = (res,msg='created')=>{
  return res.status(201).json({
    message:msg
  });
}

const updatedResponse = (res)=>{
  return res.status(204).end();
}

const errorResponse = (res,msg='fail !!',statusCode=400)=>{
  return res.status(statusCode).json({
    message:msg
  })
}

module.exports = {
  successResponse,
  createdResponse,
  updatedResponse,
  errorResponse
}