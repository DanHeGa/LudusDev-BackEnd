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

async function updateAnteproyecto(req, res) {
    try {
        const id = parseInt(req.params.id);
        const updatedData = req.body;

        const resultado = await anteproyectoService.updateAnteproyecto(id, updatedData);

        if (resultado.getStatus()) {
            res.status(200).json({ message: "Anteproyecto actualizado correctamente" });
        } else {
            res.status(400).json({
                message: "Error al actualizar el anteproyecto",
                error: resultado.getErr()
            });
        }
    } catch (error) {
        console.error('Error en updateAnteproyecto:', error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

async function deleteAnteproyecto(req, res) {
    try {
        const id = parseInt(req.params.id);

        const resultado = await anteproyectoService.deleteAnteproyecto(id);

        if (resultado.getStatus()) {
            res.status(200).json({ message: "Anteproyecto eliminado correctamente" });
        } else {
            res.status(400).json({
                message: "Error al eliminar el anteproyecto",
                error: resultado.getErr()
            });
        }
    } catch (error) {
        console.error('Error en deleteAnteproyecto:', error);
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
}

async function getAnteproyectos(req, res) {
    try {
        const resultado = await anteproyectoService.getAllAnteproyectos();

        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error en getAnteproyectos:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
}

async function getAnteproyectoById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const resultado = await anteproyectoService.getAnteproyectoById(id);

        if (resultado) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({ message: 'Anteproyecto no encontrado' });
        }
    } catch (error) {
        console.error('Error en getAnteproyectoById:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
}

async function getAnteproyectoByUser(req, res) {
    try {
        const userId = req.query.userId;
        const resultado = await anteproyectoService.getAnteproyectoByUser(userId);
        res.status(200);
        res.json({
            status : "success",
            result : resultado.rows
        });
    } catch (error) {
        console.error('Error en getAnteproyectoByUser:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
}



module.exports = {
    insertAnteproyecto,
    updateAnteproyecto,
    deleteAnteproyecto,
    getAnteproyectos,
    getAnteproyectoById,
    getAnteproyectoByUser
};