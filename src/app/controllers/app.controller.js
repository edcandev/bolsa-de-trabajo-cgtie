const path = require('path');
const nanoid = import('nanoid');
//const fetch = import('node-fetch');

const adminsSistemaController = require('../../api/controllers/adminsSistema.controller');

const viewsFolder = path.join(__dirname,'../views/');

const sessions = [];

function getIndexPage(req, res) {
    //res.clearCookie('Auth');
    res.sendFile(path.join(viewsFolder,'index.html'));
}

async function checkLogin(req, res) { // (POST, '/app/login')

    


    const isValid = await adminsSistemaController.checkAdminsSistema(req);

    if(isValid) {
        
        res.clearCookie('NotAuth');
        const sessionId =  (await nanoid).nanoid();
        const user = req.body.user;
        sessions.push({ sessionId, user});
        res.cookie('sessionId', sessionId, { httpOnly: true });

        res.redirect('/app/inicio');
        //console.log(req.cookies);

        //res.redirect(301, '/app/inicio');
    } else {
        res.cookie('NotAuth','notauth');
        res.redirect('back');
    }
}

function toInicio(req, res) {

    const { cookies } = req;

    console.log("Sesiones: ");
    console.log(sessions);

    const isLogged = adminLogger(cookies);

    if(isLogged) {
        res.sendFile(path.join(viewsFolder,'inicio.html'));
    } else {
        res.sendFile(path.join(viewsFolder,'401.html'));
    }
}

function toCandidatos(req, res) {
}

['Logger']
function adminLogger(cookies) {
    return sessions.some(session => session.sessionId === cookies.sessionId); 
}


module.exports = { getIndexPage, checkLogin, toInicio, toCandidatos};