/**
 * Users service.
 * Contains all the required logic to manage users on the APP.
 * 
 * It is a good practice to separate the service from the controller, in order to have a better separation of concerns
 * and a better code organization.
 * 
 * Examples of why this is a good practice:
 * 1. The service can be used by other controllers or services. (e.g. a web socket service or a cron job).
 * 2. The service can modify the datasource without the need of a controller.
 * 3. The service can be used by other services.
 * 
 */
const dataSource = require('../Datasource/MySQLMngr');
const hashService = require('./hashPassword');

/**
 * Method that returns the list of users. NOTE that the method returns also the passwords of the users.
 * This is a security issue that should be fixed in the future.
 *
 * @returns Users list in json format
 */
async function getUsers(){
    let qResult;
    try{
        let query = 'SELECT name,username,age FROM users';
        qResult = await dataSource.getData(query);   
    }catch(err){
        qResult = new dataSource.QueryResult(false,[],0,0,err.message);
    }
    return qResult;
}


/**
 * This method gets a user by its id.
 * 
 * @param {String} username of the given user.
 * @returns the user object.
 */
async function findUser(username){
    let qResult;
    try{
        // note the parameter wildcard ? in the query. This is a placeholder for the parameter that will be passed in the params array.
        let query = 'select name,username,age from users where username = ?';
        let params = [username]
        qResult = await dataSource.getDataWithParams(query,params);
    }catch(err){
        qResult = new dataSource.QueryResult(false,[],0,0,err.message);
    }
    return qResult;
}

/**
 * Method that inserts a user into the database.
 * @param {*} user the json object that contains the user data.
 * @returns query result object with the information of the query execution.
 */
async function insertUser(user){
    let qResult;
    try{
        // note the parameter wildcard ? in the query. This is a placeholder for the parameter that will be passed in the params array.
        let query = 'insert into users (name,username,password,age,hash_password) VALUES (?,?,?,?,?)';
        //first u hash the given password and then u can insert the new user with the actually hashed password
        user.hash_password = await hashService.encryptPassword(user.password);
        let params = [user.name, user.username,user.password, user.age,user.hash_password]
        qResult = await dataSource.insertData(query,params);
    }catch(err){
        qResult = new dataSource.QueryResult(false,[],0,0,err.message);
    }
    return qResult;
}


/**
 * Method that updates a user into the database.
 * @param {*} user 
 * @returns 
 */
async function updateUser(user){
    let qResult;
    try{
        // note the parameter wildcard ? in the query. This is a placeholder for the parameter that will be passed in the params array.
        let query = 'update users set name = ?,username = ?,password = ?,age = ?, hash_password = ? where id = ?';
        user.hash_password = await hashService.encryptPassword(user.password);
        let params = [user.name, user.username,user.password, user.age, user.hash_password, user.id]
        qResult = await dataSource.updateData(query,params);
    }catch(err){
        qResult = new dataSource.QueryResult(false,[],0,0,err.message);
    }
    return qResult;
}

/**
 * Method that updates a user into the database.
 * @param {*} user 
 * @returns 
 */
async function deleteUser(user_id){
    let qResult;
    try{
        // note the parameter wildcard ? in the query. This is a placeholder for the parameter that will be passed in the params array.
        let query = 'delete from users where id = ?';
        let params = [user_id]
        qResult = await dataSource.updateData(query,params);
    }catch(err){
        qResult = new dataSource.QueryResult(false,[],0,0,err.message);
    }
    return qResult;
}


module.exports = {
    getUsers,
    findUser,
    insertUser,
    updateUser,
    deleteUser
}