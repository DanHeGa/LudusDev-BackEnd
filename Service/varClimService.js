const dataSource = require('../Datasource/MySQLMngr');
const basicRecord = require('../Service/newBasicRecordService');
const constants = require('../constants');

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

async function insertVariablesClimaticas(climaInfo) {
    let qResult;
    try {
        console.log("🌡️ Insertando registro básico para variables climáticas...");
        const basicRegistry = await basicRecord.newRecord(climaInfo);
        const idRegistro = basicRegistry.unico;

        const idZona = getKeyByValue(constants.zona, climaInfo.zona);

        const query = `
            INSERT INTO variables_climaticas (
                ID_registro, zona, pluviosidadMm, temperaturaMaxima,
                humedadMaxima, temperaturaMinima, nivelQuebradaMt
            ) VALUES (?, ?, ?, ?, ?, ?, ?);
        `;

        const values = [
            idRegistro,
            idZona,
            climaInfo.pluviosidadMm,
            climaInfo.temperaturaMaxima,
            climaInfo.humedadMaxima,
            climaInfo.temperaturaMinima,
            climaInfo.nivelQuebradaMt
        ];

        console.log("🌧️ Insertando datos en variables_climaticas...");
        qResult = await dataSource.insertData(query, values);
        console.log("✅ Inserción completada.");
    } catch (error) {
        console.error("❌ Error en insertVariablesClimaticas:", error);
        throw error;
    }

    return qResult;
}

module.exports = { insertVariablesClimaticas };
