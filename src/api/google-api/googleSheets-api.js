const fs = require('fs');
const {google} = require('googleapis');
const {GoogleAuth} = require('google-auth-library');

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const auth = new GoogleAuth(
    {keyFile: "./src/api/google-api/credentials.json",
    scopes: SCOPES
});

// ESTA FUNCION LEE LA HOJA DE CALCULO
async function sheetsAutomateGet(hojaURL, hojaRango) {

    const client = await auth.getClient();
    const sheets = google.sheets({ version:"v4", auth:client });

    const getRows = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId: hojaURL,
        range: hojaRango,
    });
    return getRows.data.values;
    /*
    El metodo getRows nos retorna un arreglo con las filas de nuestra hoja de calculo
    incluye la fila de encabezado (indice[0])

    Los registro comienzan en el indice[1]
    */
}

async function sheetsAutomatePost(hojaURL, hojaRango, userPostData) {

    const client = await auth.getClient();
    const sheets = google.sheets({ version:"v4", auth:client });

    const postRows = await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId: hojaURL ,
        range: hojaRango,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: userPostData,
        },
    });
    return postRows.data.values;
    /*
    Los inserts siguen el formato
    [ 
        ["fila1 valor1","fila1 valor2","fila1 valor3"] 
        ["fila2 valor1","fila2 valor2","fila2 valor1"] 
    ]
    */
}

module.exports = { sheetsAutomateGet, sheetsAutomatePost };