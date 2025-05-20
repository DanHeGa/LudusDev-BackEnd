const validacionCoberturaService = require('../../Service/validacionCoberturaService');
const basicRecord = require('../../Service/newBasicRecordService');
const evidences = require('../../Service/evidenciasService');

/**
 * Controller para manejar los registros de validación de cobertura
 * @module validacionCoberturaController
 */
async function newValidacionCobertura(req, res) {
    const startTime = new Date();
    const requestId = Math.random().toString(36).substring(2, 9);

    console.log(`\n[${startTime.toISOString()}] [Request ${requestId}] Iniciando validación de cobertura`);
    console.log(`[Request ${requestId}] Body recibido:`, JSON.stringify(req.body, null, 2));

    try {
        const validationData = req.body;

        // Verificación básica
        if (!validationData || Object.keys(validationData).length === 0) {
            throw new Error("El cuerpo de la solicitud está vacío");
        }

        // 1. Insertar en validacion_cobertura (el service ya maneja el registro básico)
        console.log(`[Request ${requestId}] Insertando validación de cobertura...`);
        const dbResult = await validacionCoberturaService.insertValidacionCobertura(validationData);

        // 2. Obtener el ID generado desde el resultado del service
        const idRegistro = dbResult.getRows()?.[0]?.ID_registro || "desconocido";

        const response = {
            status: "success",
            message: "Registro de validación de cobertura creado exitosamente",
            data: {
                id_registro: idRegistro,
                id_validacion: dbResult.getGenId(),
                total_changes: dbResult.getChanges(),
                evidencias_procesadas: validationData.evidencias ? validationData.evidencias.length : 0
            },
            metadata: {
                requestId: requestId,
                processingTime: `${new Date() - startTime}ms`,
                timestamp: new Date().toISOString()
            }
        };

        console.log(`[Request ${requestId}] ✔ Proceso completado en ${response.metadata.processingTime}`);
        res.status(200).json(response);

    } catch (error) {
        const errorTime = new Date() - startTime;
        console.error(`[Request ${requestId}] ❌ Error después de ${errorTime}ms:`, error);

        const errorResponse = {
            status: "error",
            message: error.message || "Error al procesar la validación de cobertura",
            requestId: requestId,
            timestamp: new Date().toISOString(),
            details: process.env.NODE_ENV === 'development' ? {
                stack: error.stack,
                receivedData: req.body
            } : undefined
        };

        res.status(500).json(errorResponse);
    }
}

module.exports = {
    newValidacionCobertura
};
