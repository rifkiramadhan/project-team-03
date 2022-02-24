const multer = require ('multer');
const path = require ('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './tmp/my-uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    //reject file
    cb(
      {
        message: 'Unsupported file format',
      },
      false
    );
  };
};

const upload = multer({ 
    storage: storage,
    limits: {
      fileSize: 3000000,
    },
    fileFilter: fileFilter,
});

module.exports = upload;