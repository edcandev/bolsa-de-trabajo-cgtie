const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const apiRouter =  require ('./api/routes/api.routes.js');
const formRouter = require('./form/routes/form.routes');

// process.env.PORT devuelve un puerto dis
const PORT = 3000 || process.env.PORT;

// publicFolder contiene los archivos estáticos y públicos (css,imgs,js).
const publicFolder = path.join(__dirname,'/public');

// config middleware bodyParser
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false})); 

// TODOS los archivos estáticos están en "public", dentro existen subdirectorios para cada ruta solicitada
app.use(express.static(publicFolder));

// Configurando app para usar los Routers
app.use(apiRouter); 
app.use(formRouter);

// Cualquier middleware que sea utilizdo desde el script incial es utilizado en los modulos que lo utilicen, por ejemplo, router y controller

app.listen(PORT, () => console.log("CGTIE - Escuchando en puerto: "+ PORT));
