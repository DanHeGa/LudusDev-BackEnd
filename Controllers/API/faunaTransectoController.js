const faunaService = require('../../Service/faunaTransectoService');
const basicService = require('../../Service/newBasicRecordService');

async function insertFaunaTransecto(req, res) {
  try {
    const reqJson = req.body;
    // Insertar en tabla 'registro'
    const basicInsert = await basicService.newRecord(reqJson);

    // Insertar en tabla 'fauna_transecto'
    const faunaInsert = await faunaService.insertFaunaTransecto(reqJson, basicInsert.unico);

    res.status(200).json({
      status: 'ok',
      idRegistro: basicInsert.unico,
      idFaunaTransecto: faunaInsert.qResult.getGenId()
    });
  } catch (error) {
    console.error("Error en insertFaunaTransecto:", error);
    res.status(500).json({ status: 'error', msg: error.message });
  }
}

module.exports = { insertFaunaTransecto };
