const googleSheets = require('../google-api/googleSheets-api.js'); // goo = funciones de la API de Google

// DATOS DE LA HOJA DE UNIDADES
const unidadesURL = '1aHT-PS82AUyetqzNh8Q2Wt1BwG0fg1wYp_Jbok_DCSU';
const unidadesRange = 'Respuestas de formulario 1!A:K';

// FUNCIONES ASINCRONAS A LA API DE GOOGLE

async function getUnidadesEco(req,res) {
    console.log("API - Obteniendo Unidades");
    const resultado = await googleSheets.sheetsAutomateGet(unidadesURL,unidadesRange);
    const respuestaJSON = JSON.stringify(Object.assign({}, resultado));
    res.send(respuestaJSON);
}

async function postUnidadesEco(req,res) {
    console.log("API - Posteando Unidades");
    //console.log(req.body);
    //console.log(Object.keys(req.body));
    //await googleSheets.sheetsAutomatePost(unidadesURL,unidadesRange,insertEjemplo);
    res.json(req.body);
}

// req.body es un objeto de Javascript
// Debe ser convertido a un arreglo para ser insertado al Spreadsheet

module.exports = { getUnidadesEco, postUnidadesEco};