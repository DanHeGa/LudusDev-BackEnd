const camaraTrampService = require('../../Service/camarasTrampaService');

/**
 * Method to insert new camara_trampa registries into the DB
 * @param {Object} req the request object
 * @param {Object} res the response object 
*/

async function newCamaraTrampa(req, res){
    try{
        let newCam = req.body;
        const result = await camaraTrampService.insertCamaraTramp(newCam);
        res.status(200);
        res.json({
            "status" : "success", 
            "total"   : result.changes,
            "gen_id" : result.gen_id
        });
    } catch (error) {
        let jsonError = {
            "status"  : "error",
            "message" : error.message
        };
        console.log(error);
        res.status(500);
        res.send(jsonError);
    }
}

module.exports = {newCamaraTrampa};