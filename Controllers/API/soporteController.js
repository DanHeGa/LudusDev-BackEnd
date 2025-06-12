const soporteService = require('../../Service/soporteService');

async function crearSoporte(req, res) {
    try {
        const { nombre, correo, asunto, descripcion } = req.body;
        await soporteService.insertarSoporte({ nombre, correo, asunto, descripcion });
        res.status(201).json({ status: 'success', message: 'Solicitud enviada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

module.exports = { crearSoporte };
