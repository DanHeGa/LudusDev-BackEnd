const dataSource = require('../Datasource/MySQLMngr');

/**
 * Inserta un nuevo anteproyecto en la base de datos.
 * @param {Object} anteproyecto - Objeto con los datos del anteproyecto.
 * @returns {Object} Resultado de la inserción.
 */
async function insertAnteproyecto(anteproyecto) {
    const query = `
        INSERT INTO anteproyecto (
            ID_convocatoria, titulo, descripcion, fechaLimite,
            creadoPor, status
        ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        anteproyecto.ID_convocatoria,
        anteproyecto.titulo,
        anteproyecto.descripcion || null,
        anteproyecto.fechaLimite,
        anteproyecto.creadoPor,
        anteproyecto.status || 'activo'
    ];

    return await dataSource.insertData(query, values);
}

module.exports = {
    insertAnteproyecto
};
