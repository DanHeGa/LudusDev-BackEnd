const multer = require('multer');
const path = require('path');
require('dotenv').config(); // Carga las variables de entorno

// Tipos MIME permitidos
const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Usa la ruta definida en DOC_PATH o, si no está definida, por defecto "./uploads/"
    cb(null, process.env.DOC_PATH || './uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
