const dataSource = require('../Datasource/MySQLMngr');
const constants = require('../constants');

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

async function insertFaunaTransecto(reqJson, idRegistro) {
  try {
    const query = `
      INSERT INTO fauna_transecto 
      (ID_registro, numeroTransecto, tipoAnimal, nombreComun, nombreCientifico, numeroIndividuos, tipoObservacion)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const tipoAnimal = getKeyByValue(constants.tipoAnimal, reqJson.tipoAnimal);
    const tipoObservacion = getKeyByValue(constants.tipoObservacion, reqJson.tipoObservacion);

    const params = [
      idRegistro,
      reqJson.numeroTransecto,
      tipoAnimal,
      reqJson.nombreComun,
      reqJson.nombreCientifico,
      reqJson.numeroIndividuos,
      tipoObservacion
    ];

    const qResult = await dataSource.insertData(query, params);
    return { qResult };
  } catch (err) {
    console.error(" Error en insertFaunaTransecto:", err);
    throw err;
  }
}

module.exports = { insertFaunaTransecto };
