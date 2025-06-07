const convocatoriaService = require('../../Service/convocatoriaService');

/**
 * Inserta una nueva convocatoria.
 */
async function insertConvocatoria(req, res) {
    try {
        const data = req.body;
        console.log("📩 Nueva convocatoria recibida:", data);

        const result = await convocatoriaService.insertConvocatoria(data);

        res.status(200).json({
            status: "success",
            total: result.changes,
            gen_id: result.gen_id || result.lastID
        });

    } catch (error) {
        console.error("❌ Error al insertar convocatoria:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
}

/**
 * Obtiene todas las convocatorias.
 */
async function getConvocatorias(req, res) {
    try {
        const result = await convocatoriaService.getConvocatorias();

        res.status(200).json({
            status: "success",
            total: result.rows.length,
            records: result.rows
        });

    } catch (error) {
        console.error("❌ Error al obtener convocatorias:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
}

module.exports = { insertConvocatoria, getConvocatorias };
