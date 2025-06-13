const multer = require('multer');
const path = require('path');
const profilePhotoService = require('../../Service/profilePhotoService');
require('dotenv').config(); // Asegúrate de cargar las variables de entorno

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.IMAGE_PATH); // Usa la ruta del .env
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

async function processUpload(req, res) {
  try {
    const id_usuario = req.user.id; // El id del usuario autenticado (del token)
    const nombre = req.file.filename;

    await profilePhotoService.saveProfilePhoto({ nombre, usuario_carga: id_usuario });
    await profilePhotoService.updateUserProfilePhoto({ id_usuario, nombre });

    res.status(200).json({ status: 'success', filename: nombre });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = { upload, processUpload };
