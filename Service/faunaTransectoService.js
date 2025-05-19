const dataSource = require('../Datasource/MySQLMngr');
const constants = require('../constants');
const evidencias = require('../Service/evidenciasService');


function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

async function addFaunaPuntoConteo(reqJson) {
    try {
        const { unico } = await newRecord(reqJson);

        const zona = getKeyByValue(constants.zona, reqJson.zona);
        const tipoAnimal = getKeyByValue(constants.tipoAnimal, reqJson.tipoAnimal);
        const tipoObservacion = getKeyByValue(constants.tipoObservacion, reqJson.tipoObservacion);
        const alturaObservacion = getKeyByValue(constants.alturaObservacion, reqJson.alturaObservacion);

        const nombreComun = reqJson.nombreComun || null;
        const nombreCientifico = reqJson.nombreCientifico || null;
        const numeroIndividuos = parseInt(reqJson.numeroIndividuos) || 0;

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

        // Agregar evidencia con observaciones e imágenes
        await evidencias.newEvidenceService(unico, reqJson);

        return { id_fauna_punto_conteo: qResult.getGenId(), ID_registro: unico };

    } catch (error) {
        console.error("Error en addFaunaPuntoConteo:", error);
        throw error;
    }
}

module.exports = { insertFaunaTransecto };
