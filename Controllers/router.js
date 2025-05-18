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

//API ACTIVITY CONTROLLERS 
const camaraTramp = require('./API/camaraTrampaControllers');

const router = express.Router();


//API ACTIVITY ROUTES, no need of authentication in this part (for now).
router.post(constants.contextURL + constants.apiURL + "/newCamara", camaraTramp.newCamaraTrampa);

module.exports = router;