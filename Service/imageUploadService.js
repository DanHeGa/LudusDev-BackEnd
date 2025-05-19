const dataSource = require('../Datasource/MySQLMngr');

/**
 * Method that will store on database the log of uploaded images.
 * Stores the name of the stored file and the name of the user that uploads.
 * @param {*} image object expected to be inside the images attribute of the request JSON
 *                  this object has to have two attributes: name and base64.
 * @returns image_id to get every image unique id
 */
async function uploadedImageLog(image){
    let qResult;
    try{
        // note the parameter wildcard ? in the query. This is a placeholder for the parameter that will be passed in the params array.
        let query = "INSERT INTO imagenes (nombre) VALUES (?)";
        let params = [image.name];
        qResult = await dataSource.insertData(query,params);
        console.log("Uploaded img successfully");
        return { qResult, image_id: qResult.getGenId() };
    }catch(err){
        console.log("upload img error");
        qResult = new dataSource.QueryResult(false,[],0,0,err.message);
    }
    return qResult;
}

module.exports = {uploadedImageLog};