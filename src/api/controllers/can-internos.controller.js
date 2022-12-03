const googleSheets = require('../google-api/googleSheets-api.js'); // goo = funciones de la API de Google

// DATOS DE LA HOJA DE INTERNOS
const canInternosURL = '1ttjwBiva_wNu_9MJPSrSwcP_M6l72KdN4jkIu2XHd6o';
const canInternosRange = 'Respuestas de formulario 1!A:AE';

// FUNCIONES ASINCRONAS A LA API DE GOOGLE

async function getCanInternos(req,res) {
    console.log("API - Obteniendo Candidatos Internos");
    const resultado = await googleSheets.sheetsAutomateGet(canInternosURL,canInternosRange);
    const respuestaJSON = JSON.stringify(Object.assign({}, resultado));
    res.send(respuestaJSON);
}

module.exports = { getCanInternos };