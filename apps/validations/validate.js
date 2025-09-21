const ResponseError = require("../errors/response-error")

const validate =(schema,request)=>{
  const {error,value} = schema.validate(request,{
    abortEarly:false,
    allowUnknown:false
  })

  if(error){
    let ers={}
    error.details.forEach(e=>{
      const key = e.path.join('.');
      ers[key] = e.message
    })
    throw new ResponseError(400,ers)
  }else{
    return value
  }
}

module.exports = validate