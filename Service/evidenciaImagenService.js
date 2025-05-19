const dataSource = require('../Datasource/MySQLMngr');

/**
 * Method to insert a new evidencia_imagen registry 
 */

async function evidencia_imageServ(id_evidence, id_img){
    let qResult;
    try{
        let query = "INSERT INTO evidencia_imagen VALUES (?, ?)";
        let params = [id_evidence, id_img];
        console.log("about to make a new relation");
        qResult = await dataSource.insertData(query, params);
        console.log("Did a new relation YES");
        return {qResult};
    } catch(err) {
        console.error("Error en relationEviImg:", err);
        throw err;
    }
}

module.exports = {evidencia_imageServ};