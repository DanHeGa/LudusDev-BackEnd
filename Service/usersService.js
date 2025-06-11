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
 * Method that retrieves how many users with an specified status exists
 * @param {*} status int 1 for active, 2 for inactive
 * @returns total users with status as 1 | 2
 */
async function countUsers(status){
    let qResult;
    try{
        let query = 'select count(ID_usuario) as total from usuario where statusUsuario = ?';
        qResult = await dataSource.getDataWithParams(query, [status]);
    } catch(error) {
        qResult1 = new dataSource.QueryResult(false,[],0,0,error.message);
    }
    return qResult
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
        // Validar que no exista un usuario con el mismo email (el username puede repetirse)
        const emailQuery = `SELECT ID_usuario FROM usuario WHERE email = ?`;
        const userByEmail = await dataSource.getDataWithParams(emailQuery, [user.email]);
        if (userByEmail.rows.length > 0) {
            return new dataSource.QueryResult(false, [], 0, 0, `El correo electrónico '${user.email}' ya está en uso.`);
        }

        // Inserción del usuario (username puede estar duplicado)
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

        qResult = await dataSource.insertData(query, params);
        
        // Asignar el rol EcoRanger (ID_rol = 3) si la inserción fue exitosa
        if (qResult.status && qResult.gen_id) {
            const assignRoleQuery = `INSERT INTO roles_usuario (ID_usuario, ID_rol) VALUES (?, ?)`;
            await dataSource.insertData(assignRoleQuery, [qResult.gen_id, 3]);
        }

    } catch (err) {
        console.error("ERROR EN insertUser:", err);
        qResult = new dataSource.QueryResult(false, [], 0, 0, err?.message || String(err));
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
 * Method that updates a user into the database.
 * gets an object with the user username and new password
 * @param {*} user 
 * @returns 
 */
async function updateUserPassword(user){
    let qResult;
    try{
        let query = `
            UPDATE usuario 
            SET contrasenaHashed = ?
            WHERE username = ?
        `;
        const hash = await hashService.encryptPassword(user.password);
        let params = [hash, user.username]; // <-- Cambia aquí
        qResult = await dataSource.updateData(query,params);
        console.log("Filas afectadas:", qResult.affectedRows || qResult.rowCount || JSON.stringify(qResult));
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

/**
 * Verifica si existe un usuario con ese email y contraseña.
 * @param {String} email 
 * @param {String} password 
 * @returns el usuario si es válido o null
 */
async function validateUserByEmail(email, password) {
    try {
        const query = `SELECT * FROM usuario WHERE email = ?`;
        const result = await dataSource.getDataWithParams(query, [email]);

        if (result.rows.length === 0) return null;

        const user = result.rows[0];
        const isPasswordValid = await hashService.comparePassword(password, user.contrasenaHashed);

        return isPasswordValid ? user : null;
    } catch (err) {
        console.error("Error en validateUserByEmail:", err.message);
        return null;
    }
}

/**
 * 
 * This method gets the user's role(3->ecoranger, 2->admin) based on their email
 * 
 * @param {String} email Verifica el rol del usuario segun su email
 * @returns el rol del usuario
 */
async function getRoleByEmail(email) {
    let qResult;
    try {
        let query = "select u.email as email, ru.ID_rol as rol from usuario u join roles_usuario ru on ru.ID_usuario = u.ID_usuario where u.email = ?;";
        qResult = await dataSource.getDataWithParams(query, [email]); 
    } catch(error) {
        qResult = new dataSource.QueryResult(false,[],0,0,error.message);
    }
    return qResult;
}


module.exports = {
    getUsers,
    findUser,
    insertUser,
    updateUser,
    deleteUser,
    validateUserByEmail,
    updateUserPassword,
    countUsers,
    getRoleByEmail
}
