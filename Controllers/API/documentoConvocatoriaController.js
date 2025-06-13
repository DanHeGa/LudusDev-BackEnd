const documentoConvocatoriaService = require('../../Service/documentoConvocatoriaService');
const path = require('path');
const fs = require('fs');

async function insertDocumentoConvocatoria(req, res) {
    try {
        const ID_convocatoria = parseInt(req.params.id_convocatoria, 10);
        const subidoPor = parseInt(req.body.subidoPor, 10); // 
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
        if (!result.rows || result.rows.length === 0) {
            return res.status(404).json({ error: "No se encontraron documentos para esta convocatoria" });
        }

        res.status(200).json({
            status: "success",
            total: result.rows.length,
            documentos: result.rows
        });
    } catch (error) {
        console.error("Error al obtener documentos de convocatoria:", error);
        res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
    }
}

async function descargarDocumento(req, res) {
    try {
        const idDocumento = parseInt(req.params.id_documento, 10);
        if (isNaN(idDocumento)) {
            return res.status(400).json({ error: "ID de documento inválido" });
        }

        // Obtén la información del documento desde la base de datos
        const result = await documentoConvocatoriaService.getDocumentoPorId(idDocumento);
        const doc = result.rows && result.rows[0];
        if (!doc) {
            return res.status(404).json({ error: "Documento no encontrado" });
        }

        // Verifica si el archivo existe en el servidor
        const filePath = path.resolve(doc.rutaArchivo);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "Archivo no encontrado en el servidor" });
        }

        // Descarga el archivo con el nombre original y el tipo MIME correcto
        res.download(filePath, doc.nombreOriginal, (err) => {
            if (err) {
                console.error("Error al descargar el archivo:", err);
                res.status(500).json({ error: "Error al descargar el archivo" });
            }
        });
    } catch (error) {
        console.error("Error al descargar documento:", error);
        res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
    }
}

module.exports = {
    insertDocumentoConvocatoria,
    getDocumentosPorConvocatoria,
    descargarDocumento
};