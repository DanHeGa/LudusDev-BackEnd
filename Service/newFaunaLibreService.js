const dataSource = require('../Datasource/MySQLMngr');
const basicRecord = require('../Service/newBasicRecordService');
const evidences = require('../Service/evidenciasService');
const constants = require('../constants');

/**
 * Método que inserta un nuevo registro de fauna en búsqueda libre
 * @param {*} newFauna JSON con la información de fauna (búsqueda libre)
 * @returns Resultado de la inserción
 */
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

async function insertFaunaLibre(newFauna) {
    let qResult;
    try {
        console.log("Insertando registro básico de fauna búsqueda libre...");
        const basicRegistry = await basicRecord.newRecord(newFauna);
        const id_registry = basicRegistry.unico;
        const id_zone = getKeyByValue(constants.zona, newFauna.zona);

        const query = `INSERT INTO fauna (
            ID_registro, zona, tipo_animal, nombre_comun, nombre_cientifico,
            numero_individuos, tipo_observacion, altura_observacion,
            observaciones, evidencia, evidencia_imagen
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            id_registry,
            id_zone,
            newFauna.tipoAnimal,
            newFauna.nombreComun,
            newFauna.nombreCientifico,
            newFauna.numeroIndividuos,
            newFauna.tipoObservacion,
            newFauna.alturaObservacion,
            newFauna.observaciones,
            newFauna.evidencia || null,
            newFauna.evidenciaImagen || null
        ];

        console.log("Ejecutando inserción en tabla fauna...");
        qResult = await dataSource.insertData(query, values);

        console.log("Insertando evidencias asociadas...");
        await evidences.newEvidenceService(id_registry, newFauna);

        console.log("Registro de fauna (búsqueda libre) completado con éxito.");
    } catch (error) {
        console.error("Error al insertar fauna búsqueda libre:", error);
        throw error;
    }

    return qResult;
}

module.exports = { insertFaunaLibre };
