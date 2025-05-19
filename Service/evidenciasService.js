const dataSource = require('../Datasource/MySQLMngr');
const newImageServ = require('../Service/imageUploadService');
const relationEviImg = require('../Service/evidenciaImagenService');
const multer = require('multer');
const path = require('path');
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
 * Method to add a new evidence with only observations 
 * @param JSON with input request
 * @return evidence_id to get the identificator of every evidence made.
 */
//ADD IDREGISTRY PARAMETER TO ADD THIS FUNCTION IN THE CAMARAS TRAMPA OR OTHERS
async function newEvidenceService( jsonReq){
    let qResult;
    let images_ids = [];
    try {
        let query = `INSERT INTO evidencias(ID_registro, observaciones) VALUES (?, ?)`;
        id_registry = 2; //for testing
        let params = [id_registry, jsonReq.observaciones];
        console.log("I'm going to make a new evidence with only observations");
        qResult = await dataSource.insertData(query, params);
        console.log("New evidence, ONLY observations made here");
        evidence_id = qResult.getGenId()
        
        //inserting each provided image to images table
        images = jsonReq.images;
        for(let i = 0; i < images.lenght; i++) {
            console.log("Uploading image");
            //Upload image to local computer
            imageRest.upload.single("image");
            //upload images to database
            newImg = await newImageServ.uploadedImageLog(images[i]);
            images_ids.push(newImg.image_id);
            console.log(newImg.qResult); ///JUST IDK
        }
        //return {qResult, evidence_id: qResult.getGenId() };

        for(let j = 0; j < images_ids.length; j++) {
            const relation = await relationEviImg.evidencia_imageServ(evidence_id, images_ids[j]);
            console.log(relation); //JUST IDK
        }

    } catch (err){
        console.log("Error en newEvidenceService");
        throw err;
    }
}

module.exports = { newEvidenceService };