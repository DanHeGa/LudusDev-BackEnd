const { addFaunaPuntoConteo } = require('../../Service/faunaPuntoConteoService');

async function postFaunaPuntoConteo(req, res) {
    try {
        const result = await addFaunaPuntoConteo(req.body);
        res.status(201).json({
            message: 'Registro de fauna_punto_conteo creado exitosamente',
            data: result
        });
    } catch (err) {
        console.error("Error en postFaunaPuntoConteo:", err);
        res.status(500).json({ error: 'Error interno al registrar fauna_punto_conteo' });
    }
}

module.exports = { postFaunaPuntoConteo };
