const port = 3000;

//URLS 

const indexURL = '/';
const contextURL = '/CSoftware';
const apiURL = '/api';

const estadoTiempo = {
    '1': 'soleado',
    '2': 'parcialmente_nublado',
    '3': 'lluvioso'
}

const estacion = {
    '1': 'verano_seco',
    '2': 'invierno_lluviosa'
}

const tiporegistro = {
    '1': 'fauna_transecto',
    '2': 'fauna_punto_conteo',
    '3': 'fauna_busqueda_libre',
    '4': 'validacion_cobertura',
    '5': 'parcela_vegetacion',
    '6': 'camaras_trampa',
    '7': 'variables_climaticas'
}

const zona = {
    '1': 'bosque',
    '2': 'arreglo_agroforestal',
    '3': 'cultivos_transitorios',
    '4': 'cultivos_permanentes'
}

const tipoAnimal = {
    '1': 'mamifero',
    '2': 'ave',
    '3': 'reptil',
    '4': 'anfibio',
    '5': 'insecto'
}

const tipoObservacion = {
    '1': 'la_vio',
    '2': 'huella',
    '3': 'rastro',
    '4': 'caceria',
    '5': 'le_dijeron',
}

module.exports= {
    port,
    indexURL,
    contextURL,
    apiURL,
    estadoTiempo,
    estacion,
    tiporegistro,
    zona,
    tipoAnimal,
    tipoObservacion
}