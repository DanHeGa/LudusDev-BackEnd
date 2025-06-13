const dataSource = require('../Datasource/MySQLMngr');

async function saveProfilePhoto({ nombre, usuario_carga }) {
    // Guarda en la tabla imagenes
    const query = `INSERT INTO imagenes (nombre, usuario_carga) VALUES (?, ?)`;
    return await dataSource.insertData(query, [nombre, usuario_carga]);
}

async function updateUserProfilePhoto({ id_usuario, nombre }) {
    // Actualiza el campo fotoperfil en usuario_perfil
    const query = `UPDATE usuario_perfil SET fotoperfil = ? WHERE ID_usuario = ?`;
    return await dataSource.insertData(query, [nombre, id_usuario]);
}

module.exports = { saveProfilePhoto, updateUserProfilePhoto };