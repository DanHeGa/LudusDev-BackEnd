// const { param } = require('../Controllers/router');
const dataSource = require('../Datasource/MySQLMngr');
const basicRecord = require('../Service/newBasicRecordService');
const IdGetter = require('../Service/conversionService');

/**
 * Method that gets the list of camara_trampa registries
 *  @param {*}  JSON that contains all the new Camara Trampa registry info.
 *  @returns All registries from the camaras_trampa table
 * ASYNC used for the funtion to work with coroutines and dont stop running
 * AWAIT to wait for the service response and get the full answer from the called service
 * without them, consistency could be lost.
 */

async function insertCamaraTramp(newCamara){
    let qResult;
    try {
        console.log("LLego a insetCamara")
        id_registry = await basicRecord.newRecord(newCamara); //use await because it's a query to the DB
        let query = 'INSERT INTO camara_trampa(ID_registro, codigo, zona, nombre_camara, placa_camara, placaGuaya, anchoCaminoMt, fechaInstalacion, distanciaObjetivoMt, alturaLenteMt, listaChequeo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        console.log("getting id zone");
        let id_zone = await IdGetter.IDresolver('ID_zona', 'zona', 'nombre', toString(newCamara.zona));
        console.log("Got id zone");
        const fechaInstalacion = new Date(newCamara.body.fechaInstalacion).toISOString().split('T')[0];
        const listaChequeo = JSON.stringify(newCamara.body.listaChequeo)
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
        console.log("got newcamaratramp");    
    } catch (error) {
        console.error("Error en newRecord:", err);
        throw err; 
    }
    return qResult;
}

module.exports = {insertCamaraTramp};