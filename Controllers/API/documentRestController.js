const multer = require('multer');
const path = require('path');
const documentService = require('../../Service/documentUploadService');
require('dotenv').config();

const DOC_PATH = process.env.DOC_PATH;

// 1. Configure the storage for documents
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DOC_PATH); // Ensure this folder exists and is writable
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// 2. Initialize multer with the document storage config
const upload = multer({ storage });

// 3. Controller function to handle document upload
async function processUpload(req, res) {
    try {
        console.log(req.file); // Contains uploaded file info

        const document = {
            nombre: req.file.filename,
            usuario_carga: req.user.username // Make sure req.user is set by some auth middleware
        };

        const result = await documentService.uploadedDocumentLog(document);

        if (result.getStatus()) {
            res.status(200).json({ status: "success" });
        } else {
            res.status(500).json({
                status: "error",
                message: result.getErr()
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

module.exports = { upload, processUpload };
