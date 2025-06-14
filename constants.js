const port = 3000;

// URLs
const indexURL = '/';
const contextURL = '/CSoftware';
const apiURL = '/api';

const estadoTiempo = {
    '1': 'soleado',
    '2': 'parcialmente_nublado',
    '3': 'lluvioso'
};

const estacion = {
    '1': 'verano_seco',
    '2': 'invierno_lluviosa'
};

const tiporegistro = {
    '1': 'fauna_transecto',
    '2': 'fauna_punto_conteo',
    '3': 'fauna_busqueda_libre',
    '4': 'validacion_cobertura',
    '5': 'parcela_vegetacion',
    '6': 'camaras_trampa',
    '7': 'variables_climaticas'
};

const zona = {
    '1': 'bosque',
    '2': 'arreglo_agroforestal',
    '3': 'cultivos_transitorios',
    '4': 'cultivos_permanentes'
};

const tipoAnimal = {
    '1': 'mamifero',
    '2': 'ave',
    '3': 'reptil',
    '4': 'anfibio',
    '5': 'insecto'
};

const tipoObservacion = {
    '1': 'la_vio',
    '2': 'huella',
    '3': 'rastro',
    '4': 'caceria',
    '5': 'le_dijeron'
};

const cuadrante = {
    '1': 'A',
    '2': 'B',
    '3': 'C',
    '4': 'D',
    '5': 'E',
    '6': 'F',
    '7': 'G'
};

const subCuadrante = {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4'
};

const habitoCrecimiento = {
    '1': 'arbusto_<1mt',
    '2': 'arbolito_1-3mt',
    '3': 'arbol_>3mt'
};

const alturaObservacion = {
    '1': 'baja_<1mt',
    '2': 'media_1-3mt',
    '3': 'alta_>3mt'
};

const cobertura = {
    '1': 'BD',
    '2': 'RA',
    '3': 'RB',
    '4': 'PA',
    '5': 'PL',
    '6': 'CP',
    '7': 'CT',
    '8': 'VH',
    '9': 'TD',
    '10': 'IF'
};

const disturbio = {
    '1': 'inundacion',
    '2': 'quema',
    '3': 'tala',
    '4': 'erupcion',
    '5': 'mineria',
    '6': 'carretera',
    '7': 'mas_plantas_acuaticas',
    '8': 'otro'
};

module.exports = {
    port,
    indexURL,
    contextURL,
    apiURL,
    estadoTiempo,
    estacion,
    tiporegistro,
    zona,
    tipoAnimal,
    tipoObservacion,
    cuadrante,
    subCuadrante,
    habitoCrecimiento,
    alturaObservacion,
    cobertura,
    disturbio
};
