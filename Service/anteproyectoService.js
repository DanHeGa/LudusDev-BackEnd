const dataSource = require('../Datasource/MySQLMngr');

/**
 * Inserta un nuevo anteproyecto en la base de datos.
 * @param {Object} anteproyecto - Objeto con los datos del anteproyecto.
 * @returns {Object} Resultado de la inserción.
 */
async function insertAnteproyecto(anteproyecto) {
    // Formatea la fecha a 'YYYY-MM-DD' si existe
    let fechaLimite = anteproyecto.fechaLimite;
    if (fechaLimite instanceof Date) {
        fechaLimite = fechaLimite.toISOString().split('T')[0];
    }
    
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
        fechaLimite,
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

async function deleteSpecificAnteproyecto(title, fechaCreacion) {
    const query = `DELETE FROM anteproyecto WHERE titulo = ? and fechaCreacion = ?;`;
    return await dataSource.deleteData(query, [title, fechaCreacion]);
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

/**
 * Gets an anteproyecto based on the user
 * @param {userID} id anteproyecto creator 
 * @returns all the user's anteproyectos
 */
async function getAnteproyectoByUser(userID) {
    const query = `select 
                        an.titulo as titulo,
                        an.descripcion as descripcion,
                        an.fechaCreacion as fechaInicial,
                        an.fechaLimite as fechaLimite
                    from anteproyecto an where an.creadoPor = ?
                    order by an.ID_anteproyecto desc;`;
    const param = [userID];
    return await dataSource.getDataWithParams(query, param);
}

module.exports = {
    insertAnteproyecto,
    updateAnteproyecto,
    deleteAnteproyecto,
    getAllAnteproyectos,
    getAnteproyectoById,
    getAnteproyectoByUser,
    deleteSpecificAnteproyecto
};
