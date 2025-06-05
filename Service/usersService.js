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
        let query = 'SELECT ID_usuario, username, email, fechaRegistro, statusUsuario FROM usuario';
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
        let query = 'SELECT ID_usuario, username, email, statusUsuario FROM usuario WHERE username = ?';
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
    try {
        const query = `
            INSERT INTO usuario (username, contrasenaHashed, email, fechaRegistro, statusUsuario)
            VALUES (?, ?, ?, ?, ?)
        `;
        const fecha = new Date();
        const hash = await hashService.encryptPassword(user.password);
        const params = [
            user.username,
            hash,
            user.email,
            fecha,
            user.statusUsuario
        ];

        console.log("QUERY:", query);
        console.log("PARAMS:", params);

        qResult = await dataSource.insertData(query, params);

        // Verifica si fue exitoso
        console.log("RESULTADO DE INSERCIÓN:", qResult);

    } catch (err) {
        console.error("ERROR EN insertUser:", err);
        if (err instanceof dataSource.QueryResult) {
            qResult = err;
        } else {
            qResult = new dataSource.QueryResult(false, [], 0, 0, err?.message || String(err));
        }
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
        let query = `
            UPDATE usuario 
            SET username = ?, contrasenaHashed = ?, email = ?, statusUsuario = ?
            WHERE ID_usuario = ?
        `;
        const hash = await hashService.encryptPassword(user.password);
        let params = [user.username, hash, user.email, user.statusUsuario, user.ID_usuario];
        qResult = await dataSource.updateData(query,params);
    }catch(err){
        qResult = new dataSource.QueryResult(false,[],0,0,err.message);
    }
    return qResult;
}

/**
 * Method that deletes a user from the database.
 * @param {*} user_id 
 * @returns 
 */
async function deleteUser(user_id){
    let qResult;
    try{
        // note the parameter wildcard ? in the query. This is a placeholder for the parameter that will be passed in the params array.
        let query = 'DELETE FROM usuario WHERE ID_usuario = ?';
        let params = [user_id];
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
