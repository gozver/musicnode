// multer is a middleware for handling multipart/form-data, which is primarily used for uploading files
const multer = require('multer');

// disk storage controls how to store files into disk
const diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/avatars')
  },
  filename: (req, file, callback) => {
    const mimeType = file.mimetype.split('/');
    const fileType = mimeType[1];
    const fileName = `${Date.now()}.${fileType}`;
    // const fileName = `${file.originalname}_${Date.now()}.${fileType}`;

    callback(null, fileName);
  }
});

// fileFilter controls what type of files are allowed
const fileFilter = (req, file, callback) => {
  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  
  allowedMimeTypes.includes(file.mimeType) 
    ? callback(null, true) 
    : callback(null, true);
}

// NOTE: the <NAME> you use in multer's storage.single(<NAME>) function 
// must be the same as the one you use in <input type="file" name="<NAME>" ...>.
const storage = multer({ storage: diskStorage, fileFilter: fileFilter }).single('file');

module.exports = storage;



