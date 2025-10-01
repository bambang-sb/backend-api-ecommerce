const express = require('express');
const app = express();
const routes = require('../routes/route');
const errorMiddleware = require('../middleware/error-middleware');
const ResponseError = require('../errors/response-error');

//mongodb
let mongo = require('./mongodb');
mongo;
app.use(express.json())

//routes
app.use('/api', routes);  
//not found 404
app.use((req,res,next)=>{
  let err = new ResponseError(404,'Not Founded')
  next(err);
})
//error handler
app.use(errorMiddleware)


module.exports = app