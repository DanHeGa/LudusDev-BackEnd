const validacionCoberturaService = require('../../Service/validacionCoberturaService');

/**
 * Method to insert new validacion_cobertura registries into the DB
 * @param {Object} req the request object
 * @param {Object} res the response object 
 */
async function newValidacionCobertura(req, res) {
    try {
        let newValidation = req.body;
        const result = await validacionCoberturaService.insertValidacionCobertura(newValidation);
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

module.exports = {newValidacionCobertura};