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

/**
 * Elimina una convocatoria por ID.
 * @param {number} id - ID de la convocatoria.
 */
async function deleteConvocatoria(id) {
    const query = `DELETE FROM convocatoria WHERE ID_convocatoria = ?`;
    return await dataSource.deleteData(query, [id]);
}

/**
 * Actualiza una convocatoria por ID.
 * @param {number} id - ID de la convocatoria.
 * @param {Object} data - Campos a actualizar.
 */
async function updateConvocatoria(id, data) {
    // Construimos dinámicamente las partes del query
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(data)) {
        fields.push(`${key} = ?`);
        values.push(value);
    }

    // Si no hay campos, no hacemos update
    if (fields.length === 0) {
        return { status: false, err: "No fields to update", changes: 0 };
    }

    const query = `UPDATE convocatoria SET ${fields.join(', ')} WHERE ID_convocatoria = ?`;
    values.push(id); // Agrega el ID al final

    return await dataSource.updateData(query, values);
}

/**
 * Consulta convocatorias por ID del creador.
 * @param {number} userId - ID del usuario creador.
 * @returns {Object} Resultado de la consulta.
 */
async function getConvocatoriasByUser(userId) {
    const query = `SELECT * FROM convocatoria WHERE creadoPor = ? ORDER BY fechaCreacion DESC`;
    return await dataSource.getDataWithParams(query, [userId]);
}

/**
 * Gets a convocatoeia based on it's name
 * @param {name} name conocatoria's name
 * @returns all the requested convocatoria's info
 */
async function getConvoByName(name) {
    const query = `select 
                        c.ID_convocatoria as idConvo,
                        c.nombreConvocatoria as nombreConvo,
                        c.descripcion as descripcion,
                        c.fechaCierre as fechaLimite,
                        c.creadoPor as creadoPor,
                        c.status as statusConvo
                    from convocatoria c 
                    where c.nombreConvocatoria = ?;`;
    const param = [name];
    return await dataSource.getDataWithParams(query, param);
}


module.exports = {
    insertConvocatoria,
    getConvocatorias,
    deleteConvocatoria,
    updateConvocatoria,
    getConvocatoriasByUser,
    getConvoByName
};
