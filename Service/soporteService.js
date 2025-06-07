const dataSource = require('../Datasource/MySQLMngr');

async function insertarSoporte({ nombre, correo, asunto, descripcion }) {
    try {
        const query = `
            INSERT INTO soporte (nombre, correo_electronico, asunto, descripcion_problema)
            VALUES (?, ?, ?, ?)
        `;
        const params = [nombre, correo, asunto, descripcion];
        const result = await dataSource.insertData(query, params);
        return result;
    } catch (error) {
        console.error('Error al insertar soporte:', error);
        throw error;
    }
}

module.exports = { insertarSoporte };