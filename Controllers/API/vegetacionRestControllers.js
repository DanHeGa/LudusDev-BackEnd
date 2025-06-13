// Importa el servicio de vegetación que contiene la lógica principal
const vegetacionService = require('../../Service/vegetacionService');

/**
 * Controller que recibe el JSON desde la APP para insertar un nuevo registro de vegetación.
 * 
 * ASYNC permite ejecutar funciones que usan await, necesarias para operaciones asincrónicas con la BD.
 * AWAIT se usa para esperar la respuesta completa del servicio llamado antes de continuar,
 * lo que garantiza consistencia en el flujo de datos.
 * 
 * @param {*} req - Objeto de solicitud con el JSON desde la APP.
 * @param {*} res - Objeto de respuesta HTTP que se envía al cliente.
 */
async function insertVegetacion(req, res) {
    try {
        const newVegetacion = req.body;

        console.log("🌿 Recibido nuevo registro de vegetación:", newVegetacion);

        const resultado = await vegetacionService.insertVegetacion(newVegetacion);

        res.status(200).json({
            status: "success",
            total: resultado.changes,
            gen_id: resultado.gen_id || resultado.lastID // Compatibilidad con distintos gestores de BD
        });

        console.log("✅ Registro de vegetación insertado correctamente");

    } catch (error) {
        console.error("❌ Error al insertar vegetación:", error);

        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

module.exports = { insertVegetacion };
