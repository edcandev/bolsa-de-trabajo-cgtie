const path = require('path');



const viewsFolder = path.join(__dirname,'../views/');

function getIndexPage(req, res) {
    res.sendFile(path.join(viewsFolder,'index.html'));
}

function datosEnviados(req, res) {
    res.sendFile(path.join(viewsFolder,'ok.html'));
}

function validandoPostVacantes(req, res) {

    let coma;
    let invalido;

    //console.log(req.body);
    //Aquí verificamos si existen comas dentro

    Object.values(req.body).forEach(value => {
        // Se verifica si existe alguna coma en algún campo
        if(value.includes(',')) {
            coma = true;
        }
        // Se verifica si la primera opción NO es el valor por default
        if(value == 'Desplegar opciones') {
            invalido = true;
        }
    });

    if(coma || invalido) {
        console.log("Se encontró una coma");
        res.redirect(`${req.headers.origin}`);
        res.end();
    } else {
        res.redirect(307,'/api/vacantes/');
        res.end();
        //res.redirect('/ok/');
    }
}


module.exports = { validandoPostVacantes, getIndexPage, datosEnviados};




