/**
 * Router configuration file for the specific web application.
 * 
 * 1. Imports the corresponding express library and router.
 * 2. Reads the templates handler file
 * 3. Reads the api handler file
 * 4. Defines a Generic Upload File Rest Service that redirects to a specific 
 *    Upload handler
 * 
 * Ernesto Cantú
 */
const express = require('express');
const imageRest = require('./API/imageRestController');
const basico = require('../Controllers/API/basicRecordController')
const constants = require("../constants");
//API ACTIVITY CONTROLLERS 
const camaraTramp = require('./API/camaraTrampaControllers');
const vegetacion = require('./API/vegetacionRestControllers'); // ← Angela: Parcela Vegetación


const router = express.Router();

//API ACTIVITY ROUTES, no need of authentication in this part (for now).
router.post(constants.contextURL + constants.apiURL + "/newCamara", camaraTramp.newCamaraTrampa);
router.post(constants.contextURL + constants.apiURL + "/newVegetacion", vegetacion.insertVegetacion); // ← ngela: Parcela Vegetación RUTA
router.post(constants.contextURL + constants.apiURL + "/newRecord", basico.insertRecord);

router.post(constants.contextURL + constants.apiURL + "/imageUpload", imageRest.processUpload);

module.exports = router;