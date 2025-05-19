const dataSource = require('../Datasource/MySQLMngr');
const basicRecord = require('../Service/newBasicRecordService');
const constants = require('../constants');

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

async function insertVegetacion(data) {
    let qResult;
    try {
        console.log("🌱 Insertando registro básico para vegetación...");
        const basicRegistry = await basicRecord.newRecord(data);
        const idRegistro = basicRegistry.unico;

        const idCuadrante = getKeyByValue(constants.cuadrante, data.cuadrante);
        const idSubCuadrante = getKeyByValue(constants.subcuadrante, data.subCuadrante);
        const idHabito = getKeyByValue(constants.habito_crecimiento, data.habitoCrecimiento);



        const query = `
            INSERT INTO parcela_vegetacion (
                ID_registro, codigo, ID_cuadrante, ID_subCuadrante, ID_habito_crecimiento,
                nombreComun, nombreCientifico, placa, circunferenciaCm,
                distanciaMt, estaturaBiomonitorMt, alturaMt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const values = [
            idRegistro,
            data.codigo,
            idCuadrante,
            idSubCuadrante,
            idHabito,
            data.nombreComun,
            data.nombreCientifico,
            data.placa,
            data.circunferenciaCm,
            data.distanciaMt,
            data.estaturaBiomonitorMt,
            data.alturaMt
        ];

        console.log("🌳 Insertando datos en parcela_vegetacion...");
        qResult = await dataSource.insertData(query, values);
        console.log("✅ Inserción completada.");
    } catch (error) {
        console.error("❌ Error en insertVegetacion:", error);
        throw error;
    }

    return qResult;
}

module.exports = { insertVegetacion };
