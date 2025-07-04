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

// Anteproyectos
const anteproyectoController = require('./API/anteproyectoController');

// Document Upload
const documentRestController = require('./API/documentRestController');

// Upload Middleware
const upload = require('../Middleware/uploadMiddleware');
const profilePhotoUpload = require('../Middleware/profilePhotoUpload');
const uploadProfilePhoto = require('./API/uploadProfilePhoto');
const profilePhotoController = require('./API/profilePhotoController');

// Documento Convocatoria
const documentoConvocatoriaController = require('../Controllers/API/documentoConvocatoriaController');
const docAnteproyectoController = require('../Controllers/API/documentoAnteproyectoController');

const router = express.Router();

//API ACTIVITY ROUTES, no need of authentication in this part (for now).
router.post(constants.contextURL + constants.apiURL + "/newCamara", camaraTramp.newCamaraTrampa);// ← Daniela: Camaras trampa RUTA
router.post(constants.contextURL + constants.apiURL + "/newVegetacion", vegetacion.insertVegetacion); // ← Angela: Parcela Vegetación RUTA
router.post(constants.contextURL + constants.apiURL + "/newVariablesClimaticas", varClim.insertVariablesClimaticas); // ← Angela: Variables Climáticas RUTA
router.post(constants.contextURL + constants.apiURL + "/newRecord", basico.insertRecord);
//get de records segun el tipo
router.get(constants.contextURL + constants.apiURL + "/recordTypesNum", userController.authenticateToken, basico.getRecordTypesNum);
router.post(constants.contextURL + constants.apiURL + "/newValidacionCobertura", validacionCobertura.newValidacionCobertura);// ← Regina: Validación Cobertura RUTA
//router.post(constants.contextURL + constants.apiURL + "/newFaunaTransecto", faunaTransecto.insertFaunaTransecto); // Lucio: Fauna Transecto RUTA
router.post(constants.contextURL + constants.apiURL + "/newFaunaPuntoConteo", faunaPuntoConteo.postFaunaPuntoConteo); // Lucio: Fauna Punto Conteo RUTA
// LOGIN User Routes
router.post(constants.contextURL + constants.apiURL + "/newUser", userController.insertUser);
router.get(constants.contextURL + constants.apiURL + "/getUsers", userController.authenticateToken,userController.getUsers);//secured
router.post(constants.contextURL + constants.apiURL + '/loginByEmail', userController.loginWithEmail);
router.get(constants.contextURL + constants.apiURL + "/getRoleByEmail", userController.authenticateToken,userController.getUserRole);//secured

//USER PROFILE
router.post(constants.contextURL + constants.apiURL + "/newUserProfile", userProfileController.insertUserProfile);
router.get(constants.contextURL + constants.apiURL + "/getAllUserProfiles", userProfileController.getAllUserProfiles);
router.get(constants.contextURL + constants.apiURL + "/getUserProfileById/:id", userProfileController.getUserProfileById);

//USER get based on their status, SECURED, used for the admin dashboard
router.get(constants.contextURL + constants.apiURL + "/getStatusUsers", userController.authenticateToken, userController.getUsersFromStatus);

// Convocatorias <- Angela: Convocatorias RutaS, SECURED
router.post(constants.contextURL + constants.apiURL + "/newConvocatoria", userController.authenticateToken, convocatoria.insertConvocatoria);
router.get(constants.contextURL + constants.apiURL + "/getConvocatorias", convocatoria.getConvocatorias);
router.delete(constants.contextURL + constants.apiURL + "/deleteConvocatoria/:id", userController.authenticateToken, convocatoria.deleteConvocatoria);
router.put(constants.contextURL + constants.apiURL + "/updateConvocatoria/:id", userController.authenticateToken, convocatoria.updateConvocatoria);
router.get(constants.contextURL + constants.apiURL + "/getConvocatoriasByUser/:userId", userController.authenticateToken, convocatoria.getConvocatoriasByUser);
router.get(constants.contextURL + constants.apiURL + "/getConvoByName/", userController.authenticateToken, convocatoria.getConvoOnName);

router.post(constants.contextURL + constants.apiURL + "/imageUpload", imageRest.processUpload);

// Anteproyectos, SECURED
router.post(constants.contextURL + constants.apiURL + "/newAnteproyecto", userController.authenticateToken, anteproyectoController.insertAnteproyecto);
router.put(constants.contextURL + constants.apiURL + "/updateAnteproyecto/:id", userController.authenticateToken, anteproyectoController.updateAnteproyecto);
router.delete(constants.contextURL + constants.apiURL + "/deleteAnteproyecto/:id", userController.authenticateToken, anteproyectoController.deleteAnteproyecto);
router.delete(constants.contextURL + constants.apiURL + "/deleteAnteproyectoEspecifico", userController.authenticateToken, anteproyectoController.deleteAnteproyectoEspecifico);
router.get(constants.contextURL + constants.apiURL + "/getAnteproyectos", userController.authenticateToken, anteproyectoController.getAnteproyectos);
router.get(constants.contextURL + constants.apiURL + "/getAnteproyecto/:id", userController.authenticateToken, anteproyectoController.getAnteproyectoById);
router.get(constants.contextURL + constants.apiURL + "/getAnteproyectoByUser/", userController.authenticateToken, anteproyectoController.getAnteproyectoByUser);

// SUBIR DOCUMENTOS (BORRAR DESPUES DE PRUEBAS)
router.post(constants.contextURL + constants.apiURL + "/uploadFile", documentRestController.upload.single('file'), documentRestController.processUpload);

router.post(constants.contextURL + constants.apiURL + "/soporte",soporteController.crearSoporte); // 
//cambio de contraseña -> Dani
router.post(constants.contextURL + constants.apiURL + "/cambioContra", userController.updateUserPass);

// Subir Documento Convocatoria
router.post(
  constants.contextURL + constants.apiURL + "/uploadDocumentoConvocatoria/:id_convocatoria",
  upload.single('file'), documentoConvocatoriaController.insertDocumentoConvocatoria
);

router.get(
  constants.contextURL + constants.apiURL + "documentosConvocatoria/:id_convocatoria",
  documentoConvocatoriaController.getDocumentosPorConvocatoria
);

// Descargar documento de convocatoria
router.get(
  constants.contextURL + constants.apiURL + "/descargarDocumentoConvocatoria/:id_documento",
  documentoConvocatoriaController.descargarDocumento
);

router.get(
    constants.contextURL + constants.apiURL + "/documentosConvocatoria/:id_convocatoria",
    documentoConvocatoriaController.getDocumentosPorConvocatoria
);

// Subir Documento Anteproyecto
router.post(
  constants.contextURL + constants.apiURL + "/uploadDocumentoAnteproyecto/:id_anteproyecto",
  upload.single('file'),
  docAnteproyectoController.subirDocumento
);
// Subir Foto de Perfil
router.post(
  constants.contextURL + constants.apiURL + "/uploadProfilePhoto",
  userController.authenticateToken, 
  uploadProfilePhoto.upload.single("image"),
  uploadProfilePhoto.processUpload
);
router.get('/CSoftware/api/profile-photo/:filename', profilePhotoController.getProfilePhoto);


// Ruta para subir/cambiar foto de perfil
router.post(
  constants.contextURL + constants.apiURL + '/upload-profile-photo',
  userController.authenticateToken,
  profilePhotoUpload.single('foto'),
  uploadProfilePhoto.processUpload
);

// Ruta para servir la foto de perfil
router.get(
  constants.contextURL + constants.apiURL + '/profile-photo/:filename',
  profilePhotoController.getProfilePhoto
);

module.exports = router;