const path = require('path');
const nanoid = import('nanoid');
//const fetch = import('node-fetch');

const adminsSistemaController = require('../../api/controllers/adminsSistema.controller');

const viewsFolder = path.join(__dirname,'../views/');

const sessions = [];

// const isLogged = true; // DELETE ON PRUDCTIION

function getIndexPage(req, res) {
    res.clearCookie('sessionId');
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
        res.cookie('user', user);

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
    //console.log("Sesiones: ");
    //console.log(sessions);
    
    const isLogged = adminLogger(cookies);

    if(isLogged) {
        res.sendFile(path.join(viewsFolder,'inicio.html'));
    } else {
        res.sendFile(path.join(viewsFolder,'401.html'));
    }
}

function toCandidatos(req, res) {
    const { cookies } = req;
    
    const isLogged = adminLogger(cookies);

    if(isLogged) {
        res.sendFile(path.join(viewsFolder,'candidatos.html'));
    } else {
        res.sendFile(path.join(viewsFolder,'401.html'));
    }
}

function toUnidadesEco(req, res) {

    const { cookies } = req;
    
    const isLogged = adminLogger(cookies);
    

    if(isLogged) {
        res.sendFile(path.join(viewsFolder,'unidades-eco.html'));
    } else {
        res.sendFile(path.join(viewsFolder,'401.html'));
    }
}

function toVacantes (req, res) {
    const { cookies } = req;
    
     const isLogged = adminLogger(cookies);

    if(isLogged) {
        res.sendFile(path.join(viewsFolder,'vacantes.html'));
    } else {
        res.sendFile(path.join(viewsFolder,'401.html'));
    }
}

function toInformes(req, res) {
    const { cookies } = req;
    
    const isLogged = adminLogger(cookies);

    if(isLogged) {
        res.sendFile(path.join(viewsFolder,'informes.html'));
    } else {
        res.sendFile(path.join(viewsFolder,'401.html'));
    }

}

['OutLogger']
function logout(req, res) {

    sessions.forEach((session, index)=> {
        if(session.sessionId === req.cookies.sessionId) sessions.splice(index, 1);
    });
    res.clearCookie('sessionId');
    res.clearCookie('user');
    res.redirect('/app/login');
}

['Logger']
function adminLogger(cookies) {
    return sessions.some(session => session.sessionId === cookies.sessionId); 
}

module.exports = { getIndexPage, checkLogin, toInicio, toCandidatos, toUnidadesEco, toVacantes, toInformes, logout};