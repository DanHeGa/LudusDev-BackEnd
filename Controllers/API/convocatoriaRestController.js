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

/**
 * Elimina una convocatoria por ID.
 */
async function deleteConvocatoria(req, res) {
    try {
        const { id } = req.params;
        const result = await convocatoriaService.deleteConvocatoria(id);

        res.status(200).json({
            status: "success",
            message: `Convocatoria con ID ${id} eliminada.`,
            result
        });
    } catch (error) {
        console.error("❌ Error al eliminar convocatoria:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
}

/**
 * Actualiza una convocatoria por ID.
 */
async function updateConvocatoria(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;

        const result = await convocatoriaService.updateConvocatoria(id, data);

        res.status(200).json({
            status: "success",
            message: `Convocatoria con ID ${id} actualizada.`,
            result
        });
    } catch (error) {
        console.error("❌ Error al actualizar convocatoria:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
}

/**
 * Obtiene convocatorias filtradas por el ID del creador.
 */
async function getConvocatoriasByUser(req, res) {
    try {
        const { userId } = req.params;
        const result = await convocatoriaService.getConvocatoriasByUser(userId);

        res.status(200).json({
            status: "success",
            total: result.rows.length,
            records: result.rows
        });
    } catch (error) {
        console.error("❌ Error al obtener convocatorias por usuario:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
}

async function getConvoOnName(req, res) {
    try {
        const name = req.query.convoName;
        const result = await convocatoriaService.getConvoByName(name);
        res.status(200);
        res.json({
            status : "success",
            result : result.rows
        });
    } catch(error) {
        console.log("Failed to get convo by name ", error.message);
        res.status(500).send(json({
            status: "failed",
            message : error.message
        }));
    }
}



module.exports = {
    insertConvocatoria,
    getConvocatorias,
    updateConvocatoria,
    deleteConvocatoria,
    getConvocatoriasByUser,
    getConvoOnName
};
