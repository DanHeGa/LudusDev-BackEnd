const dataSource = require('../Datasource/MySQLMngr');
const IdGetter = require('./conversionService');
/**
 * Function to add a new Registro into table 'registro'
 * @returns reqJson, id_Registro. req is the JSON given by the professors simulator
 *                                id_registro is to introduce new registries into other tables such as camaras_trampa, parcela_vegetaacion, etc
 *                                so that it is linked to it's respective general registry.
 *  @param reqJson JSON with the new record/registry to add into the database     
 */

const estadoTiempo = {
    '1': 'soleado',
    '2': 'parcialmente_nublado',
    '3': 'lluvioso'
}

const estacion = {
    '1': 'verano_seco',
    '2': 'invierno_lluvioso'
}

const tiporegistro = {
    '1': 'fauna_transecto',
    '2': 'fauna_punto_conteo',
    '3': 'fauna_busqueda_libre',
    '4': 'validacion_cobertura',
    '5': 'parcela_vegetacion',
    '6': 'camaras_trampa',
    '7': 'variables_climaticas'
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
async function newRecord(reqJson) {
    let qResult;
    try { //wait for our DATA engineer to have the id_registro being auto_increment for it to be unique
        //DESPUES QUITA IDREGISTRO DE QUERY, DE LA VARIABLE Y DE LOS PARAMS!!!
        let query = 'INSERT INTO registro(ID_registro, ID_estadoTiempo, ID_estacion, ID_tipoRegistro) VALUES (?, ?, ?, ?)';
        const estado_Tiempo = getKeyByValue(estadoTiempo, reqJson.estadoTiempo);
        const estacion_ = getKeyByValue(estacion, reqJson.estacion);
        const tipo_Registro = getKeyByValue(tiporegistro, reqJson.tipoRegistro);
        unico = 102;
        console.log("about to insert new basic record");
        let params = [unico, estado_Tiempo, estacion_, tipo_Registro];
        qResult = await dataSource.insertData(query, params);
        console.log("Inserted new basic record");
        return { qResult, id_Registro: qResult.getGenId() };
    } catch (err) {
        console.error("Error en newRecord:", err);
        throw err; 
    }
} 

module.exports = { newRecord };