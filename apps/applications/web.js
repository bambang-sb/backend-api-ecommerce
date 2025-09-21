const express = require('express');
const app = express();
const routes = require('../routes/route');
const errorMiddleware = require('../middleware/error-middleware');

app.use(express.json())

//routes
app.use('/api', routes);  
//not found 404
app.use((req,res,next)=>{
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
})
//error handler
app.use(errorMiddleware)


module.exports = app