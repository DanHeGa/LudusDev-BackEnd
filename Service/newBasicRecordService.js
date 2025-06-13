const dataSource = require('../Datasource/MySQLMngr');
const constants = require('../constants');
/**
 * Function to add a new Registro into table 'registro'
 * @returns reqJson, id_Registro. req is the JSON given by the professors simulator
 *                                id_registro is to introduce new registries into other tables such as camaras_trampa, parcela_vegetaacion, etc
 *                                so that it is linked to it's respective general registry.
 *  @param reqJson JSON with the new record/registry to add into the database     
 */

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
async function newRecord(reqJson) {
    let qResult;
    try {
        let query = 'INSERT INTO registro(ID_estadoTiempo, ID_estacion, ID_tipoRegistro) VALUES (?, ?, ?)';
        const estado_Tiempo = getKeyByValue(constants.estadoTiempo, reqJson.estadoTiempo);
        const estacion_ = getKeyByValue(constants.estacion, reqJson.estacion);
        const tipo_Registro = getKeyByValue(constants.tiporegistro, reqJson.tipoRegistro);
        console.log("about to insert new basic record");
        let params = [estado_Tiempo, estacion_, tipo_Registro];
        qResult = await dataSource.insertData(query, params);
        console.log("Inserted new basic record");
        console.log(`${qResult.getGenId()}`)
        console.log(qResult)
        return { qResult, unico: qResult.getGenId() };
    } catch (err) {
        console.error("Error en newRecord:", err);
        throw err; 
    }
} 

async function getRecordTypes() {
    let qResult;
    try {
        let query = "select count(r.ID_tipoRegistro) as total, t.nombreTipoRegistro as recordType from registro r join tipoRegistro t on t.ID_tipoRegistro = r.ID_tipoRegistro group by t.nombreTipoRegistro;";
        qResult = await dataSource.getData(query);
        return qResult.rows;
    } catch(err) {
        console.log("Error al get de records ", err);
        throw err;
    }
}

module.exports = { 
    newRecord,
    getRecordTypes
 };