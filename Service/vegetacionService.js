const dataSource = require('../Datasource/MySQLMngr');
const basicRecord = require('../Service/newBasicRecordService');
const constants = require('../constants');
const evidences = require('../Service/evidenciasService');

/**
 * Utilidad para encontrar la clave de un valor en un catálogo.
 */
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

/**
 * Inserta un nuevo registro en la tabla parcela_vegetacion.
 * Genera primero un registro básico usando newBasicRecordService.
 * 
 * @param {Object} vegetacionInfo - JSON con todos los datos de vegetación.
 * @returns {Object} Resultado de la inserción.
 */
async function insertVegetacion(vegetacionInfo) {
    let qResult;
    try {
        console.log("🌱 Insertando registro básico para vegetación...");
        const basicRegistry = await basicRecord.newRecord(vegetacionInfo);
        const idRegistro = basicRegistry.unico;

        const idCuadrante = getKeyByValue(constants.cuadrante, vegetacionInfo.cuadrante);
        const idSubCuadrante = getKeyByValue(constants.subCuadrante, vegetacionInfo.subCuadrante);
        const idHabito = getKeyByValue(constants.habitoCrecimiento, vegetacionInfo.habitoCrecimiento);

        const query = `
            INSERT INTO parcela_vegetacion (
                ID_registro, codigo, ID_cuadrante, ID_subCuadrante, ID_habito_crecimiento,
                nombreComun, nombreCientifico, placa, circunferenciaCm,
                distanciaMt, estaturaBiomonitorMt, alturaMt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const values = [
            idRegistro,
            vegetacionInfo.codigo,
            idCuadrante,
            idSubCuadrante,
            idHabito,
            vegetacionInfo.nombreComun,
            vegetacionInfo.nombreCientifico,
            vegetacionInfo.placa || null,
            vegetacionInfo.circunferenciaCm,
            vegetacionInfo.distanciaMt,
            vegetacionInfo.estaturaBiomonitorMt,
            vegetacionInfo.alturaMt
        ];

        console.log("🌳 Insertando datos en parcela_vegetacion...");
        qResult = await dataSource.insertData(query, values);
        console.log("✅ Inserción completada.");
        evidencias = evidences.newEvidenceService(id_registry, newCamara);
        console.log("Inserted new evidences from Parcela de Vegetacion");
    } catch (error) {
        console.error("❌ Error en insertVegetacion:", error);
        throw error;
    }

    return qResult;
}

module.exports = { insertVegetacion };