const { insertData } = require('../Datasource/MySQLMngr');

async function guardarDocumento({
  ID_anteproyecto,
  nombreOriginal,
  nombreArchivo,
  rutaArchivo,
  tipoMIME,
  tamanoByte,
  subidoPor
}) {
  const query = `
    INSERT INTO documento_anteproyecto (
      ID_anteproyecto, nombreOriginal, nombreArchivo, rutaArchivo,
      tipoMIME, tamanoByte, subidoPor
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    ID_anteproyecto,
    nombreOriginal,
    nombreArchivo,
    rutaArchivo,
    tipoMIME,
    tamanoByte,
    subidoPor
  ];

  return await insertData(query, params);
}

module.exports = {
  guardarDocumento
};