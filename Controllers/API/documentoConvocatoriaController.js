const documentoConvocatoriaService = require('../../Service/documentoConvocatoriaService');

async function insertDocumentoConvocatoria(req, res) {
    try {
        const ID_convocatoria = parseInt(req.params.id_convocatoria, 10);
        const subidoPor = parseInt(req.body.subidoPor, 10); // O puedes obtenerlo de req.user si usas autenticación
        
        if (!req.file) {
            return res.status(400).json({ error: "Archivo no recibido" });
        }
        if (isNaN(ID_convocatoria)) {
            return res.status(400).json({ error: "ID de convocatoria inválido" });
        }
        if (isNaN(subidoPor)) {
            return res.status(400).json({ error: "ID de usuario inválido" });
        }

        const documento = {
            ID_convocatoria,
            nombreOriginal: req.file.originalname,
            nombreArchivo: req.file.filename,
            rutaArchivo: req.file.path,
            tipoMIME: req.file.mimetype,
            tamanoByte: req.file.size,
            subidoPor
        };

        const result = await documentoConvocatoriaService.insertDocumentoConvocatoria(documento);
        res.status(200).json({
            status: "success",
            inserted: result.changes || 1,
            gen_id: result.gen_id || result.lastID,
            documento: documento
        });
    } catch (error) {
        console.error(" Error al subir documento convocatoria:", error);
        res.status(500).json({ error: "Error al subir el documento", detalle: error.message });
    }
}

/**
 * Obtiene los documentos de una convocatoria.
 */
async function getDocumentosPorConvocatoria(req, res) {
    try {
        const idConvocatoria = parseInt(req.params.id_convocatoria, 10);
        if (isNaN(idConvocatoria)) {
            return res.status(400).json({ error: "ID de convocatoria inválido" });
        }
        const result = await documentoConvocatoriaService.getDocumentosPorConvocatoria(idConvocatoria);
        res.status(200).json({
            status: "success",
            total: result.rows.length,
            documentos: result.rows
        });
    } catch (error) {
        console.error(" Error al obtener documentos de convocatoria:", error);
        res.status(500).json({ error: "Error al obtener documentos", detalle: error.message });
    }
}

module.exports = {
    insertDocumentoConvocatoria,
    getDocumentosPorConvocatoria,
};