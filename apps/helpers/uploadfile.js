const multer = require('multer')
const path = require('path')
const fs = require('fs')
const ResponseError = require('../errors/response-error');

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads/');
  },
  filename:function(req,file,cb){
    cb(null,Date.now() + path.extname(file.originalname));
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ResponseError(400,'File harus berupa gambar (JPEG, PNG, atau GIF)!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // 5MB
  fileFilter: fileFilter
});

const deleteOldImage = (fileImage)=>{
  const filePath = path.join(__dirname,'../../uploads');
  if(fs.existsSync(filePath+'/'+fileImage)){
    fs.unlinkSync(filePath+'/'+fileImage);
    return true;
  }
  throw new ResponseError(404,'File not exist in system!!');
  
}
module.exports = {upload,deleteOldImage};