const varClimService = require('../../Service/varClimService');

/**
 * Controller que recibe el JSON desde la APP para insertar variables climáticas.
 */
async function insertVariablesClimaticas(req, res) {
    try {
        const climaInfo = req.body;
        console.log("🌍 Recibido nuevo registro de variables climáticas:", climaInfo);

        const result = await varClimService.insertVariablesClimaticas(climaInfo);

        res.status(200).json({
            status: "success",
            total: result.changes,
            gen_id: result.gen_id || result.lastID
        });

    } catch (error) {
        console.error("❌ Error al insertar variables climáticas:", error);
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

module.exports = { insertVariablesClimaticas };
