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
const templates = require('./Templates/templates');
const usersRest = require('./API/usersRestController');
const imageRest = require('./API/imageRestController');
const constants = require("../constants");

const router = express.Router();

/*TEMPLATES routes */
router.get(constants.indexURL, templates.index);
router.get(constants.contextURL, templates.homePage);
// router.get(constants.contextURL+'/login', templates.getLogin);
// router.get(constants.contextURL+'/logout', templates.logout);


/* API routes */
router.post(constants.contextURL + constants.apiURL + "/login", usersRest.execLogin);
router.get(constants.contextURL + constants.apiURL + "/getUsers",usersRest.authenticateToken, usersRest.getUsers);
router.post(constants.contextURL + constants.apiURL + "/findUser",usersRest.authenticateToken, usersRest.findUser);
router.post(constants.contextURL + constants.apiURL + "/insertUser",usersRest.authenticateToken, usersRest.insertUser);
router.put(constants.contextURL + constants.apiURL + "/updateUser",usersRest.authenticateToken, usersRest.updateUser); 
router.delete(constants.contextURL + constants.apiURL + "/deleteUser",usersRest.authenticateToken, usersRest.deleteUser);

router.post(constants.contextURL + constants.apiURL + "/imageUpload",usersRest.authenticateToken, imageRest.upload.single("image"), imageRest.processUpload);


module.exports = router;