const path = require('path');
require('dotenv').config();

function getProfilePhoto(req, res) {
    const filename = req.params.filename;
    const imagePath = path.join(process.env.IMAGE_PATH, filename);
    res.sendFile(imagePath, err => {
        if (err) {
            res.status(404).json({ status: 'error', message: 'Imagen no encontrada' });
        }
    });
}

module.exports = { getProfilePhoto };