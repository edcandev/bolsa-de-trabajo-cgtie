const path = require('path');
const googleSheets = require('../google-api/googleSheets-api.js'); // goo = funciones de la API de Google

// DATOS DE LA HOJA DE VACANTES
const vacantesURL = '1jWtWT8FqSZCOkhYJckZB8Rimx0P0j9FqbVOdazhY6CQ';
const vacantesRange = 'Hoja 1!A:Q';

// FUNCIONES ASINCRONAS A LA API DE GOOGLE

async function getVacantes(req,res) {
    console.log("Obteniendo Vacantes");
    const resultado = await googleSheets.sheetsAutomateGet(vacantesURL,vacantesRange);
    const respuestaJSON = JSON.stringify(Object.assign({}, resultado));
    res.send(respuestaJSON);
}

async function postVacantes(req,res) {
    console.log("API - Posteando Vacantes");

    const fila = Object.values(req.body);
    const fecha = new Date().toLocaleDateString();
    fila.push(fecha);
    const registroAInsertar =[];
    registroAInsertar.push(fila);        
    await googleSheets.sheetsAutomatePost(vacantesURL,vacantesRange,registroAInsertar);    
    
    console.log(req.body);
    const resURL = path.join(req.get('Referer'),'../ok')
    console.log(resURL);
    res.redirect('/form/ok');
    res.end();
}

// req.body es un objeto de Javascript
// Debe ser convertido a un arreglo para ser insertado al Spreadshee

module.exports = { getVacantes, postVacantes };