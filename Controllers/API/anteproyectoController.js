const anteproyectoService = require('../../Service/anteproyectoService');

async function insertAnteproyecto(req, res) {
    try {
        const anteproyecto = req.body;

        const resultado = await anteproyectoService.insertAnteproyecto(anteproyecto);

        if (resultado.getStatus()) {
            res.status(201).json({
                message: 'Anteproyecto creado correctamente',
                idAnteproyecto: resultado.getGenId()
            });
        } else {
            res.status(400).json({
                message: 'Error al crear el anteproyecto',
                error: resultado.getErr()
            });
        }
    } catch (error) {
        console.error('Error en insertAnteProyecto:', error);
        res.status(500).json({
            message: 'Error interno del servidor',
            error: error.message
        });
    }
}

module.exports = {
    insertAnteproyecto
};