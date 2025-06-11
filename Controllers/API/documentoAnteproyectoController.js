const documentoService = require('../../Service/documentoAnteproyectoService');
const path = require('path');

async function subirDocumento(req, res) {
  try {
    // Obtener el ID desde el parámetro de URL
    const { id_anteproyecto } = req.params;
    const { subidoPor } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }
    
    if (!id_anteproyecto || !subidoPor) {
      return res.status(400).json({ error: 'Faltan datos necesarios: id_anteproyecto o subidoPor' });
    }
    
    const file = req.file;
    const result = await documentoService.guardarDocumento({
      ID_anteproyecto: parseInt(id_anteproyecto),
      nombreOriginal: file.originalname,
      nombreArchivo: file.filename,
      rutaArchivo: path.resolve(file.path),
      tipoMIME: file.mimetype,
      tamanoByte: file.size,
      subidoPor: parseInt(subidoPor)
    });

    if (result.getStatus()) {
      return res.status(201).json({
        mensaje: 'Documento subido exitosamente',
        idDocumento: result.getGenId()
      });
    } else {
      return res.status(500).json({ error: result.getErr() });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al subir el documento' });
  }
}

module.exports = {
  subirDocumento
};
