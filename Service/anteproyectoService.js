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

async function updateAnteproyecto(id, data) {
    const query = `
        UPDATE anteproyecto
        SET titulo = ?, descripcion = ?, fechaLimite = ?, status = ?
        WHERE ID_anteproyecto = ?
    `;

    const values = [
        data.titulo,
        data.descripcion,
        data.fechaLimite,
        data.status,
        id
    ];

    return await dataSource.updateData(query, values);
}

async function deleteAnteproyecto(id) {
    const query = `DELETE FROM anteproyecto WHERE ID_anteproyecto = ?`;
    return await dataSource.deleteData(query, [id]);
}

async function getAllAnteproyectos() {
    const query = `SELECT * FROM anteproyecto`;
    return await dataSource.getData(query);
}

async function getAnteproyectoById(id) {
    const query = `SELECT * FROM anteproyecto WHERE ID_anteproyecto = ?`;
    const resultado = await dataSource.getData(query, [id]);
    return resultado.length > 0 ? resultado[0] : null;
}

module.exports = {
    insertAnteproyecto,
    updateAnteproyecto,
    deleteAnteproyecto,
    getAllAnteproyectos,
    getAnteproyectoById
};
