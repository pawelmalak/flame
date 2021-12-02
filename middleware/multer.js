const fs = require('fs');
const multer = require('multer');

if (!fs.existsSync('data/uploads')) {
  fs.mkdirSync('data/uploads', { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './data/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
});

const supportedTypes = ['jpg', 'jpeg', 'png', 'svg', 'svg+xml', 'x-icon'];

const fileFilter = (req, file, cb) => {
  if (supportedTypes.includes(file.mimetype.split('/')[1])) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload.single('icon');
