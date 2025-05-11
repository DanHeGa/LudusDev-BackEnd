const dataSource = require('../Datasource/MySQLMngr');

/**
 * Method that will store on database the log of uploaded images.
 * Stores the name of the stored file and the name of the user that uploads.
 * @param {*} image 
 * @returns 
 */
async function uploadedImageLog(image){
    let qResult;
    try{
        // note the parameter wildcard ? in the query. This is a placeholder for the parameter that will be passed in the params array.
        let query = 'insert into imagenes (name,usuario_carga) VALUES (?,?)';
        let params = [image.name, image.usuario_carga]
        qResult = await dataSource.insertData(query,params);
    }catch(err){
        qResult = new dataSource.QueryResult(false,[],0,0,err.message);
    }
    return qResult;
}

module.exports = {uploadedImageLog};