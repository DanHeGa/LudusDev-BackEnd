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
    '2': 'invierno_lluvioso'
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


module.exports= {
    port,
    indexURL,
    contextURL,
    apiURL,
    estadoTiempo,
    estacion,
    tiporegistro,
    zona
}