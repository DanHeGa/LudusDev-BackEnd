const dataSource = require('../Datasource/MySQLMngr');

/**
 * Method that will store on database the log of uploaded documents.
 * Stores the name of the stored file and the name of the user that uploads.
 * @param {*} document 
 * @returns 
 */
async function uploadedDocumentLog(document){
    let qResult;
    try{
        // note the parameter wildcard ? in the query. This is a placeholder for the parameter that will be passed in the params array.
        let query = 'insert into documento (nombre,usuario_carga) VALUES (?,?)';
        let params = [document.nombre, document.usuario_carga]
        qResult = await dataSource.insertData(query,params);
    }catch(err){
        qResult = new dataSource.QueryResult(false,[],0,0,err.message);
    }
    return qResult;
}

module.exports = {uploadedDocumentLog};