/**
 * Vegetacion service.
 * Contains all the required logic to manage vegetation data on the APP.
 * 
 * Good reasons to separate the service from the controller:
 * 1. The service can be reused in multiple controllers, jobs or utilities.
 * 2. The service focuses only on data logic, keeping concerns separated.
 * 3. Improves testability and maintainability.
 */

const dataSource = require('../Datasource/MySQLMngr');

/**
 * Method that inserts vegetation data into the parcela_vegetacion table.
 * 
 * @param {Object} data - JSON object containing vegetation information.
 * @returns {QueryResult} - Result object containing query execution status.
 */
async function insertVegetacion(data) {
    let qResult;
    try {
        const query = `
            INSERT INTO parcela_vegetacion (
                ID_parcela, ID_registro, codigo, ID_cuadrante, ID_subCuadrante,
                ID_habito_crecimiento, nombreComun, nombreCientifico, placa,
                circunferenciaCm, distanciaMt, estaturaBiomonitorMt, alturaMt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const params = [
            data.ID_parcela,
            data.ID_registro,
            data.codigo,
            data.ID_cuadrante,
            data.ID_subCuadrante,
            data.ID_habito_crecimiento,
            data.nombreComun,
            data.nombreCientifico,
            data.placa,
            data.circunferenciaCm,
            data.distanciaMt,
            data.estaturaBiomonitorMt,
            data.alturaMt
        ];

        qResult = await dataSource.insertData(query, params);
    } catch (err) {
        qResult = new dataSource.QueryResult(false, [], 0, 0, err.message);
    }

    return qResult;
}

module.exports = {
    insertVegetacion
};
