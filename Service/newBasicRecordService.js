const dataSource = require('../Datasource/MySQLMngr');
const IdGetter = require('./conversionService').IDresolver;
/**
 * Function to add a new Registro into table 'registro'
 * @returns reqJson, id_Registro. req is the JSON given by the professors simulator
 *                                id_registro is to introduce new registries into other tables such as camaras_trampa, parcela_vegetaacion, etc
 *                                so that it is linked to it's respective general registry.
 *  @param reqJson JSON with the new record/registry to add into the database     
 */

async function newRecord(reqJson) {
    let qResult;
    try {
        let query = 'INSERT INTO registro(ID_estadoTiempo, ID_estacion, ID_tipoRegistro) VALUES (?, ?, ?)';
        estado_Tiempo = IdGetter('ID_estadoTiempo', 'estadotiempo', 'nombreEstadoTiempo', reqJson.estadoTiempo); //check if it actually uses the estadoTiempo from the originla query or if its better to put it in a nother varible.
        estacion_ = IdGetter('ID_estacion', 'estacion', 'nombreEstacion', reqJson.estacion);
        tipo_Registro = IdGetter('ID_tipoRegistro', 'tiporegistro', 'nombreTipoRegistro', reqJson.tipoRegistro);
        let params = [estado_Tiempo, estacion_, tipo_Registro];
        qResult = await dataSource.insertData(query, params);
        return { reqJson, id_Registro: qResult.getGenId() };
    } catch (err) {
        qResult = new dataSource.QueryResult(false,[],0,0,err.message);
        return;
    }
} 

module.exports = { newRecord };