/**
 * Vegetacion REST controller.
 * 
 * Handles HTTP requests related to vegetation data.
 * This controller separates the request logic from the service logic,
 * improving code organization and maintainability.
 */

const vegetacionService = require('../../Service/vegetacionService'); 

/**
 * Method that inserts vegetation data into the database.
 * 
 * @param {Object} req - The request object (expects data in req.body).
 * @param {Object} res - The response object.
 */
async function insertVegetacion(req, res) {
    console.log("✅ Entró al insertVegetacion");
    try {
        const data = req.body;

        // Optional: Validate that required fields exist before calling the service
        if (!data.ID_parcela || !data.codigo || !data.nombreComun) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields"
            });
        }

        const result = await vegetacionService.insertVegetacion(data);
        

        if (result.success) {
            res.status(200).json({
                status: "success",
                inserted: result.changes,
                last_id: result.gen_id || result.lastID // compatible with your datasource
                
            });
        } else {
            res.status(500).json({
                status: "error",
                message: result.message || "Unknown error"
            });
        }

    } catch (error) {
        console.error("Insert Vegetacion Error:", error);
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

module.exports = {
    insertVegetacion
};
