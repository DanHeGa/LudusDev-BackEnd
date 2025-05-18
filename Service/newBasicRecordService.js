const dataSource = require('../Datasource/MySQLMngr');
const IdGetter = require('./conversionService');
/**
 * Function to add a new Registro into table 'registro'
 * @returns reqJson, id_Registro. req is the JSON given by the professors simulator
 *                                id_registro is to introduce new registries into other tables such as camaras_trampa, parcela_vegetaacion, etc
 *                                so that it is linked to it's respective general registry.
 *  @param reqJson JSON with the new record/registry to add into the database     
 */

async function newRecord(reqJson) {
    let qResult;
    try { //wait for our DATA engineer to have the id_registro being auto_increment for it to be unique
        //DESPUES QUITA IDREGISTRO DE QUERY, DE LA VARIABLE Y DE LOS PARAMS!!!
        let query = 'INSERT INTO registro(ID_registro, ID_estadoTiempo, ID_estacion, ID_tipoRegistro) VALUES (?, ?, ?, ?)';
        estado_Tiempo = await IdGetter.IDresolver('ID_estadoTiempo', 'estadotiempo', 'nombreEstadoTiempo', toString(reqJson.estadoTiempo)); //check if it actually uses the estadoTiempo from the originla query or if its better to put it in a nother varible.
        estacion_ = await IdGetter.IDresolver('ID_estacion', 'estacion', 'nombreEstacion', toString(reqJson.estacion));
        tipo_Registro = await IdGetter.IDresolver('ID_tipoRegistro', 'tiporegistro', 'nombreTipoRegistro', toString(reqJson.tipoRegistro));
        unico = 101;
        console.log("about to insert new basic record");
        let params = [unico, estado_Tiempo, estacion_, tipo_Registro];
        qResult = await dataSource.insertData(query, params);
        console.log("Inserted new basic record");
        return { id_Registro: qResult.getGenId() };
    } catch (err) {
        console.error("Error en newRecord:", err);
        throw err; 
    }
} 

module.exports = { newRecord };