const { Router } = require('express');
const router = Router();
const path = require('path');

const appController = require('../controllers/app.controller.js');

// La ruta "/" es equivalente a "index.html"
router.get('/app/login', appController.getIndexPage);
router.post('/app/login', appController.checkLogin);
router.get('/app/inicio', appController.toInicio);

router.get('/app/logout', appController.logout);

router.get('/app/candidatos', appController.toCandidatos);
router.get('/app/unidades-eco', appController.toUnidadesEco);
router.get('/app/vacantes', appController.toVacantes);
router.get('/app/informes', appController.toInformes);
router.get('/app/enviar', appController.toEnviar);

module.exports = router;