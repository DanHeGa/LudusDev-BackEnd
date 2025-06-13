const dataSource = require('../Datasource/MySQLMngr');
const constants = require('../constants');
const { newRecord } = require('./newBasicRecordService');
const evidences = require('../Service/evidenciasService');


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

async function addFaunaPuntoConteo(reqJson) {
    try {
        // Insertar en tabla 'registro'
        const { unico } = await newRecord(reqJson); // ID_registro generado

        // Obtener claves foráneas
        const zona = getKeyByValue(constants.zona, reqJson.zona);
        const tipoAnimal = getKeyByValue(constants.tipoAnimal, reqJson.tipoAnimal);
        const tipoObservacion = getKeyByValue(constants.tipoObservacion, reqJson.tipoObservacion);
        const alturaObservacion = getKeyByValue(constants.alturaObservacion, reqJson.alturaObservacion);

        const nombreComun = reqJson.nombreComun || null;
        const nombreCientifico = reqJson.nombreCientifico || null;
        const numeroIndividuos = parseInt(reqJson.numeroIndividuos) || 0;

        // Insertar en tabla 'fauna_punto_conteo'
        const query = `INSERT INTO fauna_punto_conteo (
            ID_registro, zona, tipoAnimal, nombreComun, nombreCientifico,
            numeroIndividuos, tipoObservacion, alturaObservacion
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        const params = [
            unico,
            zona,
            tipoAnimal,
            nombreComun,
            nombreCientifico,
            numeroIndividuos,
            tipoObservacion,
            alturaObservacion
        ];

        const qResult = await dataSource.insertData(query, params);

        if (reqJson.observaciones || (Array.isArray(reqJson.images) && reqJson.images.length > 0)) {
            await evidences.newEvidenceService(unico, reqJson);
            console.log("Evidencias registradas para fauna_punto_conteo.");
        }

        return { id_fauna_punto_conteo: qResult.getGenId(), ID_registro: unico };

    } catch (error) {
        console.error("Error en addFaunaPuntoConteo:", error);
        throw error;
    }
}


module.exports = { addFaunaPuntoConteo };
