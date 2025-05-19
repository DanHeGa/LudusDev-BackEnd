
const path = require('path');
const imageService = require('../../Service/imageUploadService');
const newEvidences = require('../../Service/evidenciasService');

/**
 * Method that will process the file upload and respond to client.
 * @param {*} req 
 * @param {*} res 
 */
async function processUpload(req, res){
    try{       
        console.log(req.evidencias); // Contains image file info
        const request = req.body;
        let result = await newEvidences.newEvidenceService(request);
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