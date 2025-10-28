const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const routes = require('../routes/route');
const errorMiddleware = require('../middleware/error-middleware');
const ResponseError = require('../errors/response-error');

//mongodb
let mongo = require('./mongodb');
mongo;

app.use(cors({
  origin: ['http://localhost:3001','http://localhost:3002','https://ecommerce.apidog.io'],  // Dev + Prod
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
  credentials: false, // If using cookies/auth
  allowedHeaders:['Content-Type','Authorization']
}));
app.use(express.json())

//upload
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

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