const dataSource = require('../Datasource/MySQLMngr');
const basicRecord = require('../Service/newBasicRecordService');
const evidences = require('../Service/evidenciasService');
const constants = require('../constants');

/**
 * Utilidad para obtener la clave numérica de un valor de catálogo.
 */
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

/**
 * Inserta un nuevo registro de validación de cobertura.
 * - Crea un registro básico (conversión se hace en newRecord).
 * - Inserta en validacion_cobertura.
 * - Procesa evidencias si existen.
 */
async function insertValidacionCobertura(newValidation) {
    let qResult;

    try {
        console.log("📋 1. Creando registro básico...");

        // ✅ PASAMOS los valores como texto y que newRecord haga la conversión
        const basicRegistry = await basicRecord.newRecord({
            estadoTiempo: newValidation.estadoTiempo,
            estacion: newValidation.estacion,
            tipoRegistro: newValidation.tipoRegistro,
            observaciones: newValidation.observaciones || null,
            reporteIdLocal: newValidation.reporteIdLocal,
            fechaCapturaLocal: newValidation.fechaCapturaLocal
        });

        const idRegistro = basicRegistry.unico;

        // ✅ Conversión de cobertura y disturbio
        const coberturaId = getKeyByValue(constants.cobertura, newValidation.cobertura);
        const disturbioId = getKeyByValue(constants.disturbio, newValidation.disturbio);

        const query = `
            INSERT INTO validacion_cobertura 
            (ID_registro, codigo, seguimiento, cambio, cobertura, tiposCultivo, disturbio) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            idRegistro,
            newValidation.codigo || null,
            newValidation.seguimiento === "true" || newValidation.seguimiento === true,
            newValidation.cambio === "false" || newValidation.cambio === false,
            coberturaId,
            newValidation.tiposCultivo || null,
            disturbioId
        ];

        console.log("🚀 Insertando en validacion_cobertura:", values);
        qResult = await dataSource.insertData(query, values);
        console.log("✅ Inserción completada con ID:", qResult.getGenId());

        // ✅ Procesar evidencias si vienen
        if (Array.isArray(newValidation.evidencias) && newValidation.evidencias.length > 0) {
            console.log("📎 Procesando evidencias...");
            await evidences.newEvidenceService(idRegistro, {
                observaciones: newValidation.observaciones || '',
                images: newValidation.images || []
            });
        }

    } catch (error) {
        console.error("❌ ERROR en insertValidacionCobertura:", error);
        throw error;
    }

    return qResult;
}

module.exports = { insertValidacionCobertura };

