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
const basico = require('../Controllers/API/basicRecordController');
const constants = require("../constants");
const vegetacionRest = require('./API/vegetacionRestControllers');
const camaraTramp = require('./API/camaraTrampaControllers');

const router = express.Router();

/* TEMPLATES routes */
router.get(constants.indexURL, templates.index);
router.get(constants.contextURL, templates.homePage);
// router.get(constants.contextURL+'/login', templates.getLogin);
// router.get(constants.contextURL+'/logout', templates.logout);

/* API routes */
/* Using authenticateToken acts as a middleware for accessing each URL before actually getting to them */
router.post(constants.contextURL + constants.apiURL + "/login", usersRest.execLogin);
router.get(constants.contextURL + constants.apiURL + "/getUsers", usersRest.authenticateToken, usersRest.getUsers);
router.post(constants.contextURL + constants.apiURL + "/findUser", usersRest.authenticateToken, usersRest.findUser);
router.post(constants.contextURL + constants.apiURL + "/insertUser", usersRest.authenticateToken, usersRest.insertUser);
router.put(constants.contextURL + constants.apiURL + "/updateUser", usersRest.authenticateToken, usersRest.updateUser);
router.delete(constants.contextURL + constants.apiURL + "/deleteUser", usersRest.authenticateToken, usersRest.deleteUser);

// ANGELA: "Parcela de Vegetación"
router.post(constants.contextURL + constants.apiURL + "/insertVegetacion", vegetacionRest.insertVegetacion);

// DANY: API ACTIVITY ROUTES, no need of authentication in this part (for now).
router.post(constants.contextURL + constants.apiURL + "/newCamara", camaraTramp.newCamaraTrampa);
router.post(constants.contextURL + constants.apiURL + "/newRecord", basico.insertRecord);

// Upload image route
router.post(constants.contextURL + constants.apiURL + "/imageUpload",usersRest.authenticateToken,imageRest.upload.single("image"),imageRest.processUpload);

module.exports = router;
