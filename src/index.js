const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const cookieParser = require('cookie-parser');


const apiRouter =  require ('./api/routes/api.routes.js');
const formRouter = require('./form/routes/form.routes.js');
const appRouter = require('./app/routes/app.routes.js');

// process.env.PORT devuelve un puerto dis
const PORT = process.env.PORT || 3000;

// publicFolder contiene los archivos estáticos y públicos (css,imgs,js).
const publicFolder = path.join(__dirname,'/public');

// config middleware bodyParser
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false})); 
app.use(cookieParser());
// TODOS los archivos estáticos están en "public", dentro existen subdirectorios para cada ruta solicitada
app.use(express.static(publicFolder));
// Configurando app para usar los Routers
app.use(apiRouter); 
app.use(formRouter);
app.use(appRouter);

// Cualquier middleware que sea utilizdo desde el script incial es utilizado en los modulos que lo utilicen, por ejemplo, router y controller

app.listen(PORT, () => console.log("CGTIE - Escuchando en: "+ PORT));
