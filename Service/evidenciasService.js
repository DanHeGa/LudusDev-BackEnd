const dataSource = require('../Datasource/MySQLMngr');
const newImageServ = require('../Service/imageUploadService');
const relationEviImg = require('../Service/evidenciaImagenService');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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
 * @param id_registry for registry identification and relation
 * @param JSON json request from user
 * @return results of query, only the one from evidences table.
 */
//ADD IDREGISTRY PARAMETER TO ADD THIS FUNCTION IN THE CAMARAS TRAMPA OR OTHERS
async function newEvidenceService( id_registry, jsonReq ){
    let qResult;
    let images_ids = [];
    try {
        let query = `INSERT INTO evidencias(ID_registro, observaciones) VALUES (?, ?)`;
        //id_registry = 30; //for testings
        let params = [id_registry, jsonReq.observaciones];
        console.log("I'm going to make a new evidence with only observations");
        qResult = await dataSource.insertData(query, params);
        console.log("New evidence, ONLY observations made here");
        evidence_id = qResult.getGenId()
        
        //inserting each provided image to images table
        images = jsonReq.images;
        for(let i = 0; i < images.length; i++) {
            const img = images[i];
            // Extraer el tipo y los datos base64
            const matches = img.base64.match(/^data:(.+);base64,(.+)$/);
            if (!matches) continue;
            const ext = img.name.split('.').pop();
            const buffer = Buffer.from(matches[2], 'base64');
            const filePath = path.join(IMAGE_PATH, img.name);
            fs.writeFileSync(filePath, buffer);
            // Ahora puedes registrar la imagen en la base de datos
            const newImg = await newImageServ.uploadedImageLog(images[i]);
            images_ids.push(newImg.image_id);
            console.log(newImg.qResult); ///JUST IDK
        }
        
        for(let j = 0; j < images_ids.length; j++) {
            const relation = await relationEviImg.evidencia_imageServ(evidence_id, images_ids[j]);
            console.log(relation); //JUST IDK
        }
        
        return qResult;

    } catch (err){
        console.log("Error en newEvidenceService");
        throw err;
    }
}

module.exports = { newEvidenceService };



/*console.log("Uploading image");
//Upload image to local computer
imageRest.upload.single("image");
//upload images to database
newImg = await newImageServ.uploadedImageLog(images[i]);*/