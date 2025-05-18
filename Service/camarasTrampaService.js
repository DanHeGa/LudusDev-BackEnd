// const { param } = require('../Controllers/router');
const dataSource = require('../Datasource/MySQLMngr');
const basicRecord = require('../Service/newBasicRecordService');
const constants = require('../constants');

/**
 * Method that gets the list of camara_trampa registries
 *  @param {*}  JSON that contains all the new Camara Trampa registry info.
 *  @returns All registries from the camaras_trampa table
 * ASYNC used for the funtion to work with coroutines and dont stop running
 * AWAIT to wait for the service response and get the full answer from the called service
 * without them, consistency could be lost.
 */
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

async function insertCamaraTramp(newCamara){
    let qResult;
    try {
        console.log("LLego a insetCamara")
        basicRegistry = await basicRecord.newRecord(newCamara); //use await because it's a query to the DB, QUITA EL IDCAMARA CUANDO LUCIO ARREGLE ESO
        let query = 'INSERT INTO camara_trampa(ID_registro, codigo, zona, nombre_camara, placa_camara, placaGuaya, anchoCaminoMt, fechaInstalacion, distanciaObjetivoMt, alturaLenteMt, listaChequeo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let id_registry = basicRegistry.unico;
        let id_zone = getKeyByValue(constants.zona, newCamara.zona);
        let id_camara = 1;
        const fechaInstalacion = new Date(newCamara.fechaInstalacion).toISOString().split('T')[0];
        const listaChequeo = JSON.stringify(newCamara.listaChequeo)
        let values = [
            id_registry,
            newCamara.codigo,
            id_zone,
            newCamara.nombreCamara,
            newCamara.placaCamara,
            newCamara.placaGuaya,
            newCamara.anchoCaminoMt,
            fechaInstalacion,
            newCamara.distanciaObjetivoMt,
            newCamara.alturaLenteMt,
            listaChequeo
        ];
        console.log("about to make a camaratramp");
        qResult = await dataSource.insertData(query, values);
        console.log("got new camara tramp");    
    } catch (error) {
        console.error("Error en newCamara:", error);
        throw error; 
    }
    return qResult;
}

module.exports = {insertCamaraTramp};