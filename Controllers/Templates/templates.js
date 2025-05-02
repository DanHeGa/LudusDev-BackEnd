/**
 * Templates file handler.
 * 
 * It defines async functions to handle template GET requests.
 * Each function handles a single template and renders it to the client.
 * 
 * It uses ejs template engine.
 * 
 * Ernesto Cantú
 */
const constants = require("../../constants")

/**
 * Index handler. It redirects to the main route of the project.
 * 
 * @param {Object} req Client Request
 * @param {Object} res Server Response
 */
async function index(req,res){
    res.redirect(constants.contextURL);
}

/**
 * Redirects to the home page of the project.
 * 
 * @param {Object} req Client Request
 * @param {Object} res Server Response
 */
async function homePage(req,res){
    res.render('index');
}

/**
 * Redirects to the home page of the project.
 * 
 * @param {Object} req Client Request
 * @param {Object} res Server Response
 */
async function homePage(req,res){
    res.render('index');
}


module.exports = {index,homePage};