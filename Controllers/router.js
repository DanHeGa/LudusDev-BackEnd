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
const varClim = require('./API/varClimRestControllers'); // ← Angela: Variables Climáticas
//const faunaTransecto = require('./API/faunaTransectoController'); // Lucio
const faunaPuntoConteo = require('./API/faunaPuntoConteoController'); // Lucio: Fauna Punto Conteo
const validacionCobertura = require('./API/validacionCoberturaController');// ← Regina: Validación Cobertura  
// LOGIN User Controller
const userController = require('./API/usersRestController'); // ajusta la ruta si es necesario

//USER PROFILE (MAYBE IT IS DELETED IN THE FUTURE)
const userProfileController = require('./API/userProfileController'); 


// Convocatrias
const convocatoria = require('./API/convocatoriaRestController'); // ← Angela: Convocatorias
const soporteController = require('./API/soporteController');


const router = express.Router();

//API ACTIVITY ROUTES, no need of authentication in this part (for now).
router.post(constants.contextURL + constants.apiURL + "/newCamara", camaraTramp.newCamaraTrampa);
router.post(constants.contextURL + constants.apiURL + "/newVegetacion", vegetacion.insertVegetacion); // ← Angela: Parcela Vegetación RUTA
router.post(constants.contextURL + constants.apiURL + "/newVariablesClimaticas", varClim.insertVariablesClimaticas); // ← Angela: Variables Climáticas RUTA
router.post(constants.contextURL + constants.apiURL + "/newRecord", basico.insertRecord);
router.post(constants.contextURL + constants.apiURL + "/newValidacionCobertura", validacionCobertura.newValidacionCobertura);// ← Regina: Validación Cobertura RUTA
//router.post(constants.contextURL + constants.apiURL + "/newFaunaTransecto", faunaTransecto.insertFaunaTransecto); // Lucio: Fauna Transecto RUTA
router.post(constants.contextURL + constants.apiURL + "/newFaunaPuntoConteo", faunaPuntoConteo.postFaunaPuntoConteo); // Lucio: Fauna Punto Conteo RUTA
// LOGIN User Routes
router.post(constants.contextURL + constants.apiURL + "/newUser", userController.insertUser);
router.get(constants.contextURL + constants.apiURL + "/getUsers", userController.getUsers);
router.post(constants.contextURL + constants.apiURL + '/loginByEmail', userController.loginWithEmail);

//USER PROFILE
router.post(constants.contextURL + constants.apiURL + "/newUserProfile", userProfileController.insertUserProfile);
router.get(constants.contextURL + constants.apiURL + "/getAllUserProfiles", userProfileController.getAllUserProfiles);
router.get(constants.contextURL + constants.apiURL + "/getUserProfileById/:id", userProfileController.getUserProfileById);

// Convocatorias <- Angela: Convocatorias RutaS
router.post(constants.contextURL + constants.apiURL + "/newConvocatoria", convocatoria.insertConvocatoria);
router.get(constants.contextURL + constants.apiURL + "/getConvocatorias", convocatoria.getConvocatorias);
router.post(constants.contextURL + constants.apiURL + "/imageUpload", imageRest.processUpload);

router.post(constants.contextURL + constants.apiURL + "/soporte", soporteController.crearSoporte); // 
//cambio de contraseña -> Dani
router.post(constants.contextURL + constants.apiURL + "/cambioContra", userController.updateUserPass);

module.exports = router;