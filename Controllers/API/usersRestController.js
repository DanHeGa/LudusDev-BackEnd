/**
 * Users Rest Api File
 * 
 * Defines the rest api for the users table.
 * It is a good practice to separate the api from the templates.
 * This way, the api can be used by other applications or services.
 * 
 * In the same way, is a good practice to separate the db tables on specific files.
 * On this way, tables can be managed independently and the code is more readable.
 */
const userService = require('../../Service/usersService');
const hashService = require('../../Service/hashPassword');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const SECRET = process.env.SECRET;

/**
 * Middleware that will execute before each protected URL
 * @param {*} req the original request
 * @param {*} res the users response
 * @param {*} next the method that will be executed next to this
 * @returns in case of unauthorized access
 */
async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; // Bearer <token>
    const token = authHeader && authHeader.split(' ')[1]; //takes the token from the aithHeader turned into a list
  
    if (!token) return res.sendStatus(401); // Unauthorized
  
    jwt.verify(token, SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden
      req.user = user;
      next();
    });
}


/**
 * Method that returns the list of users
 * 
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function getUsers(req,res){
    try{       
        const result = await userService.getUsers();
        res.status(200);
        res.json({
            "status"  : "success",
            "total"   : result.rows.length,
            "records" : result.rows
        });
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

async function updateUserPass(req,res){
    try{       
        let user = req.body;
        const result = await userService.updateUserPassword(user);
        res.status(200);
        res.json({
            "status"  : "success",
            "total"   : result.changes
        });
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

/**
 * Method that returns a specific user based on its id.
 * 
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function findUser(req,res){
    try{       
        let username = req.body.username;
        const result = await userService.findUser(username);
        res.status(200);
        res.json({
            "status"  : "success",
            "total"   : result.rows.length,
            "records" : result.rows
        });
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


/**
 * Method that inserts a user.
 * 
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function insertUser(req,res){
    try{       
        let user = req.body;
        const result = await userService.insertUser(user);
        res.status(200);
        res.json({
            "status"  : "success",
            "total"   : result.changes,
            "gen_id" : result.gen_id
        });
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


/**
 * Method that updates a user.
 * 
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function updateUser(req,res){
    try{       
        let user = req.body;
        const result = await userService.updateUser(user);
        res.status(200);
        res.json({
            "status"  : "success",
            "total"   : result.changes
        });
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

/**
 * Method that deletes a user.
 * 
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
async function deleteUser(req,res){
    try{       
        let user_id = req.body.user_id;
        const result = await userService.deleteUser(user_id);
        res.status(200);
        res.json({
            "status"  : "success",
            "total"   : result.changes
        });
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

/**
 * Nuevo endpoint de login usando email y password.
 */
async function loginWithEmail(req, res) {
    const { email, password } = req.body;

    const user = await userService.validateUserByEmail(email, password);

    if (!user) {
        return res.status(401).json({ isLogin: false, message: 'Correo o contraseña incorrectos' });
    }

    //create web token
    const token = jwt.sign(
        { id: user.id, userGmail: user.gmail},
        SECRET,
        {expiresIn: '1h'}
    )

    res.json({
        isLogin: true,
        user: {
            id: user.ID_usuario,
            email: user.email,
            username: user.username
        },
        jwt: token //modified!!!!
    });
}


module.exports = {
    //execLogin,
    authenticateToken, //checks user token
    getUsers,
    findUser,
    insertUser,
    updateUser,
    deleteUser, 
    loginWithEmail, //creates token
    updateUserPass
}