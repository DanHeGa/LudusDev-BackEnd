const dataSource = require('../Datasource/MySQLMngr');

/**
 * Method that gets the list of camara_trampa registries
 *  @param {*}  JSON that contains all the new Camara Trampa registry info.
 *  @returns All registries from the camaras_trampa table
 * ASYNC used for the funtion to work with coroutines and dont stop running
 * AWAIT to wait for the service response and get the full answer from the called service
 * without them, consistency could be lost.
 */

async function insertCamaraTramp(newCamara, id_registro){
    let query = 'INSERT INTO camara_trampa()'
}