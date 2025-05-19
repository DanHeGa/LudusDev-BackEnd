const dataSource = require('../Datasource/MySQLMngr');

/**
 * Inserta un nuevo registro en validacion_cobertura
 * @param {Object} newValidation - Datos de la nueva validación
 * @returns {Object} Resultado de la operación
 */
async function insertValidacionCobertura(newValidation) {
    let qResult;
    try {
        console.log("Llegó a insertValidacionCobertura");
        
        let query = `
            INSERT INTO validacion_cobertura 
            (ID_registro, codigo, seguimiento, cambio, cobertura, tiposCultivo, disturbio) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        
        let values = [
            newValidation.ID_registro,      // int (not null)
            newValidation.codigo || null,   // varchar (nullable)
            newValidation.seguimiento,      // tinyint(1) (not null)
            newValidation.cambio,           // tinyint(1) (not null)
            newValidation.cobertura,        // int (not null)
            newValidation.tiposCultivo || null, // varchar (nullable)
            newValidation.disturbio         // int (not null)
        ];
        
        console.log("Query:", query);
        console.log("Values:", values);
        
        qResult = await dataSource.insertData(query, values);
        // Si tu método insertData no regresa el ID generado, modifícalo para que lo haga.
        // Ejemplo: { changes: 1, gen_id: result.insertId }
        console.log("New validacion_cobertura inserted");    
    } catch (error) {
        console.error("Error en insertValidacionCobertura:", error);
        throw error; 
    }
    return qResult;
}

module.exports = {insertValidacionCobertura};