const dataSource = require('../Datasource/MySQLMngr');

/**
 * Function to add a new Registro into table 'registro'
 * @returns req, id_registro. req is the JSON given by the professors simulator
 *                            id_registro is to introduce new registries into other tables such as camaras_trampa, parcela_vegetaacion, etc
 *                            so that it is linked to it's respective general registry.
 *  @param reqJson JSON with the new record/registry to add into the database     
 */

async function newRecord(reqJson) {
    let qResult;
    try {
        let query = 'INSERT INTO registro(ID_estadoTiempo, ID_estacion, ID_tipoRegistro)'
    }
} 