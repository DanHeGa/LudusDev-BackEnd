const dataSource = require('../Datasource/MySQLMngr');

async function IDresolver(id, tableName,  name, search) {
    const query = `SELECT ${id} FROM ${tableName} WHERE ${name} = ?`;
    const result = await dataSource.getDataWithParams(query, [search]);
    if (result && result.rows && result.rows.length > 0){
        return result.rows[0][id];
    }
    return null;
}

module.exports = {IDresolver}