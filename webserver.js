/**
 * General Web server configuration file.
 * 
 * 1. Imports the express library.
 * 2. Configures ejs as template engine
 * 3. Configures cors and body parser for the server
 * 4. Defines static files folder as /public
 * 5. Imports the web specific project router and configure the server with the router
 * 6. Starts the server in the given port.
 * 
 * Ernesto Cantú
 */
const constants = require("./constants")
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const session = require('express-session');
const router = require("./Controllers/router");

/**
 * Session configuration function.
 * @param {Object} app
 */

//this is for express session of im not wrong
function configureSecurity(app){
    // app.use (session({
    //     secret: 'hahi9elakeddao1chhh1shh48',
    //     resave: false,
    //     saveUninitialized: false,
    // }));
    console.log("Nothing here yet");
}

/**
 * Static files and views configuration function.
 * @param {*} app 
 */
function configStaticFilesAndVies(app){
    app.set('view engine', 'ejs');

    app.use(express.static('./public'));
    app.use(router);
}

/**
 * Server configuration function.
 * It configures the server with cors and body parser.
 * @param {*} app 
 */
function configureServer(app){
    app.use(cors());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
}

/**
 * Function that creates the server and configures it with the needed middleware.
 * @returns Server object
 */
function createServer(){
    const app = express();
    configureServer(app);
    configStaticFilesAndVies(app);
    //configureSecurity(app);
    const server = require('http').createServer(app); // Create the server using the express app and potentially other middleware
    return server;
}


/**
 * Web project initialization function.
 * 1. Creates and configures the server.
 * 2. Starts the web socket server.
 * 3. Starts the server in the given port.
 * 
 * @param {Object} app 
 */
function initWebProject(){
    const server = createServer();
    server.listen(constants.port, () => {
        console.log(`CSoftware API running on port ${constants.port}`);
    });
}

module.exports = {initWebProject};