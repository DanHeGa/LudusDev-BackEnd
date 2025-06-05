const dataSource = require('../Datasource/MySQLMngr');
const bcrypt = require('bcrypt');

/**
 * Este método encripta la contraseña proporcionada.
 * @param {*} pass contraseña en texto plano
 * @returns contraseña encriptada
 */
async function encryptPassword(pass){
    return await bcrypt.hash(pass, 8);
}

/**
 * Este método compara una contraseña en texto plano con una encriptada.
 * @param {String} plain contraseña proporcionada por el usuario
 * @param {String} hashed contraseña guardada en la base de datos
 * @returns true si coinciden, false si no
 */
async function comparePassword(plain, hashed){
    return await bcrypt.compare(plain, hashed);
}

/**
 * Verifica si el usuario con ese username y contraseña existe (versión antigua, aún usada).
 * @param {*} username 
 * @param {*} password 
 * @returns user si es válido, null si no
 */
async function isValidUser(username,password){
    let query = 'SELECT ID_usuario, username, contrasenaHashed, email FROM usuario WHERE username = ?';
    let params = [username];
    const qResult = await dataSource.getDataWithParams(query, params);
    const user = qResult.rows[0];
    
    if (user) {
        const isEqual = await comparePassword(password, user.contrasenaHashed);
        if (isEqual)
            return user;
    }

    return null;
}

module.exports = {
    encryptPassword,
    comparePassword, // 👈 esta es la que faltaba exportar
    isValidUser
};
