const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Generate unique filename
    cb(null, uniqueSuffix + '-' + file.originalname); // Set the filename
  }
});

const upload = multer({ storage });

module.exports = upload;
