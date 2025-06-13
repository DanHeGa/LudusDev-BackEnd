const dataSource = require('../Datasource/MySQLMngr');

/**
 * Inserta un documento asociado a una convocatoria.
 * @param {Object} documento - Datos del documento a insertar.
 * @returns {Promise<Object>} - Resultado de la inserción.
 */
async function insertDocumentoConvocatoria(documento) {
    const query = `
        INSERT INTO documento_convocatoria (
            ID_convocatoria,
            nombreOriginal,
            nombreArchivo,
            rutaArchivo,
            tipoMIME,
            tamanoByte,
            subidoPor
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        documento.ID_convocatoria,
        documento.nombreOriginal,
        documento.nombreArchivo,
        documento.rutaArchivo,
        documento.tipoMIME,
        documento.tamanoByte,
        documento.subidoPor
    ];
    return await dataSource.insertData(query, values);
}

/**
 * Obtiene todos los documentos asociados a una convocatoria.
 * @param {number} idConvocatoria
 * @returns {Promise<Object>}
 */
async function getDocumentosPorConvocatoria(idConvocatoria) {
    const query = `
        SELECT * FROM documento_convocatoria
        WHERE ID_convocatoria = ?
        ORDER BY fechaSubida DESC
    `;
    return await dataSource.getDataWithParams(query, [idConvocatoria]);
}

/**
 * Obtiene un documento por su ID.
 * @param {number} idDocumento
 * @returns {Promise<Object>}
 */
async function getDocumentoPorId(idDocumento) {
    const query = `SELECT * FROM documento_convocatoria WHERE ID_documentoConvocatoria = ?`;
    return await dataSource.getDataWithParams(query, [idDocumento]);
}

module.exports = {
    insertDocumentoConvocatoria,
    getDocumentosPorConvocatoria,
    getDocumentoPorId
};