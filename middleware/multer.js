const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadRoot = path.resolve('data/uploads');

if (!fs.existsSync('data/uploads')) {
  fs.mkdirSync('data/uploads', { recursive: true });
}

function nameLeavesUploadRoot(name) {
  const target = path.resolve(uploadRoot, name);
  const relative = path.relative(uploadRoot, target);
  return (
    relative === '..' ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  );
}

function storedUploadName(originalname) {
  const filename = `${Date.now()}--${originalname}`;
  if (nameLeavesUploadRoot(originalname) || nameLeavesUploadRoot(filename)) {
    const error = new Error('Invalid upload filename');
    error.statusCode = 400;
    throw error;
  }
  return filename;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './data/uploads');
  },
  filename: (req, file, cb) => {
    try {
      cb(null, storedUploadName(file.originalname));
    } catch (error) {
      cb(error);
    }
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
module.exports.storedUploadName = storedUploadName;
