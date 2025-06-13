const { get } = require('express/lib/response');
const { insertData } = require('../Datasource/MySQLMngr');
const { getData, getDataWithParams } = require('../Datasource/MySQLMngr');

async function createUserProfile(profileData) {
  const {
    ID_usuario, nombre, apellidos, numeroContacto,
    pais, region, ciudad, nombreOrganizacion,
    descripcionOrganizacion, fotoperfil
  } = profileData;

  const query = `
    INSERT INTO usuario_perfil (
      ID_usuario, nombre, apellidos, numeroContacto,
      pais, region, ciudad, nombreOrganizacion,
      descripcionOrganizacion, fotoperfil
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    ID_usuario, nombre, apellidos, numeroContacto,
    pais, region, ciudad, nombreOrganizacion,
    descripcionOrganizacion, fotoperfil
  ];

  const result = await insertData(query, values);

  if (!result.getStatus()) {
    throw new Error(result.getErr());
  }

  return result.getGenId();
}

async function getUserProfiles() {
  const query = `
    SELECT 
      ID_usuario, nombre, apellidos, numeroContacto,
      pais, region, ciudad, nombreOrganizacion,
      descripcionOrganizacion, fotoperfil
    FROM usuario_perfil
  `;

  const result = await getData(query);

  if (!result.getStatus()) {
    throw new Error(result.getErr());
  }

  return result.getRows();
}

async function getUserProfileById(id) {
  const query = `SELECT * FROM usuario_perfil WHERE ID_usuario = ?`;
  const result = await getDataWithParams(query, [id]);

  if (!result.getStatus()) {
    throw new Error(result.getErr());
  }

  return result.getRows()[0]; 
}

async function getAllUserProfiles() {
  const query = `SELECT * FROM usuario_perfil`;

  const result = await getData(query);

  if (!result.getStatus()) {
    throw new Error(result.getErr());
  }

  return result.getRows();
}

module.exports = {
  createUserProfile,
  //getUserProfiles,
  getUserProfileById,
  getAllUserProfiles
};
