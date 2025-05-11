const multer = require('multer');
const path = require('path');
const imageService = require('../../Service/imageUploadService');
require('dotenv').config()

const IMAGE_PATH = process.env.IMAGE_PATH;

/*
    Storage configuration .
    This object stablishes the folder path where all images will be stored.
    also creates the name of the file that will be writen on the local folder.
*/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, IMAGE_PATH); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// configures multer with the config object.
const upload = multer({ storage });



/**
 * Method that will process the file upload and respond to client.
 * @param {*} req 
 * @param {*} res 
 */
async function processUpload(req, res){
    try{       
        console.log(req.file); // Contains image file info
        let image = {
            name: req.file.filename,
            usuario_carga: req.user.username
        }
        let result = await imageService.uploadedImageLog(image);
        if(result.getStatus()){
            res.status(200);
            res.json({
                "status"  : "success"
            });
        }else{
            let jsonError = {
                "status"  : "error",
                "message" : result.getErr()
            };
            res.status(500);
            res.send(jsonError);
        }
    }catch(error){
        let jsonError = {
            "status"  : "error",
            "message" : error.message
        };
        console.log(error);
        res.status(500);
        res.send(jsonError);
    }
}

module.exports = {upload,processUpload}