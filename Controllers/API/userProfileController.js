const userProfileService = require('../../Service/userProfileService');

async function insertUserProfile(req, res) {
  try {
    const insertId = await userProfileService.createUserProfile(req.body);
    res.status(201).json({
      message: 'Perfil de usuario creado con éxito',
      ID_perfilUsuario: insertId
    });
  } catch (error) {
    console.error('Error al insertar perfil de usuario:', error.message);
    res.status(500).json({ error: 'Error al crear el perfil de usuario' });
  }
}

async function getAllUserProfiles(req, res) {
  try {
    const profiles = await userProfileService.getAllUserProfiles();
    res.status(200).json(profiles);
  } catch (error) {
    console.error('Error al obtener todos los perfiles:', error.message);
    res.status(500).json({ error: 'Error al obtener los perfiles de usuario' });
  }
}

async function getUserProfileById(req, res) {
  const { id } = req.params;

  try {
    const profile = await userProfileService.getUserProfileById(id);

    if (!profile) {
      return res.status(404).json({ message: 'Perfil de usuario no encontrado' });
    }

    res.status(200).json(profile); 
  } catch (error) {
    console.error('Error al obtener perfil de usuario por ID:', error.message);
    res.status(500).json({ error: 'Error al obtener el perfil de usuario' });
  }
}


module.exports = {
  insertUserProfile,
  getAllUserProfiles,
  getUserProfileById,
};
