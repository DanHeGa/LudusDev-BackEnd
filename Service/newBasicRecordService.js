const dataSource = require('../Datasource/MySQLMngr');
const IdGetter = require('./conversionService');
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
    try { //wait for our DATA engineer to have the id_registro being auto_increment for it to be unique
        //DESPUES QUITA IDREGISTRO DE QUERY, DE LA VARIABLE Y DE LOS PARAMS!!!
        let query = 'INSERT INTO registro(ID_registro, ID_estadoTiempo, ID_estacion, ID_tipoRegistro) VALUES (?, ?, ?, ?)';
        const estado_Tiempo = getKeyByValue(constants.estadoTiempo, reqJson.estadoTiempo);
        const estacion_ = getKeyByValue(constants.estacion, reqJson.estacion);
        const tipo_Registro = getKeyByValue(constants.tiporegistro, reqJson.tipoRegistro);
        unico = 109; //QUITA CUANDO YA SEA AUTO_INCREMENT EL ID DEL REGISTRO
        console.log("about to insert new basic record");
        let params = [unico, estado_Tiempo, estacion_, tipo_Registro];
        qResult = await dataSource.insertData(query, params);
        console.log("Inserted new basic record");
        console.log(`${qResult.getGenId()}`)
        console.log(qResult)
        return { qResult, unico }; //manda id_Registro: qResult.getGenId() , cuando se arregle lo del auto increment
    } catch (err) {
        console.error("Error en newRecord:", err);
        throw err; 
    }
} 

module.exports = { newRecord };