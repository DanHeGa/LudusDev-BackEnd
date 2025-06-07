const dataSource = require('../Datasource/MySQLMngr');

/**
 * Inserta una nueva convocatoria en la base de datos.
 * @param {Object} convocatoria - JSON con los datos.
 * @returns {Object} Resultado de la inserción.
 */
async function insertConvocatoria(convocatoria) {
    const query = `
        INSERT INTO convocatoria (
            nombreConvocatoria, fechaCierre, sitioWeb, region,
            organizacion, pais, descripcion, creadoPor
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        convocatoria.nombreConvocatoria,
        convocatoria.fechaCierre,
        convocatoria.sitioWeb,
        convocatoria.region,
        convocatoria.organizacion,
        convocatoria.pais,
        convocatoria.descripcion,
        convocatoria.creadoPor
    ];

    return await dataSource.insertData(query, values);
}

/**
 * Consulta todas las convocatorias en la base de datos.
 * @returns {Object} Resultado de la consulta.
 */
async function getConvocatorias() {
    const query = `SELECT * FROM convocatoria ORDER BY fechaCreacion DESC`;
    return await dataSource.getData(query);
}

module.exports = {
    insertConvocatoria,
    getConvocatorias
};
