const googleSheets = require('../google-api/googleSheets-api.js'); // goo = funciones de la API de Google

// DATOS DE LA HOJA DE EXTERNOS
const canExternosURL = '1OKhgAGjH4Al4HFVimQ5hQnAzGVj0tW8MFkxAvwnLPEU';
const canExternosRange = 'Respuestas de formulario 1!A:AF';

// FUNCIONES ASINCRONAS A LA API DE GOOGLE

async function getCanExternos(req,res) {
    console.log("API - Obteniendo Candidatos Externos");
    const resultado = await googleSheets.sheetsAutomateGet(canExternosURL,canExternosRange);
    const respuestaJSON = JSON.stringify(Object.assign({}, resultado));
    res.send(respuestaJSON);
}

module.exports = { getCanExternos };