const { admin } = require('googleapis/build/src/apis/admin/index.js');
const googleSheets = require('../google-api/googleSheets-api.js'); // goo = funciones de la API de Google

// DATOS DE LA HOJA DE INTERNOS

const canInternosURL = '1AJRfrVoOYqAd3COx9ygjWpsf31oKYeO2X_hzWMKRPD8';
const canInternosRange = 'Hoja 1!A:B';

// FUNCIONES ASINCRONAS A LA API DE GOOGLE

async function getAdminsSistema(req,res) {
    console.log("API - Obteniendo Admins Sistema");
    const resultado = await googleSheets.sheetsAutomateGet(canInternosURL,canInternosRange);
    const respuestaJSON = JSON.stringify(Object.assign({}, resultado));
    res.send(respuestaJSON);
}

async function checkAdminsSistema(req) {
    console.log("API - Validando Admins Sistema");
    const resultado = Object.assign({}, await googleSheets.sheetsAutomateGet(canInternosURL,canInternosRange));
    const adminsArray = Object.values(resultado);
    adminsArray.shift();
    //console.log(adminsArray);
    const bodyArray = Object.values(req.body);
    //console.log(bodyArray);
    const isValid = adminsArray.some((value)=> value[0] === bodyArray[0] && value[1] === bodyArray[1]);
    
    return isValid;
}

module.exports = { getAdminsSistema, checkAdminsSistema };