const { Router } = require('express');
const router = Router();
const path = require('path');

const appController = require('../controllers/app.controller.js');

// La ruta "/" es equivalente a "index.html"
router.get('/app/login', appController.getIndexPage);
router.post('/app/login', appController.checkLogin);
router.get('/app/inicio', appController.toInicio);

router.all('/app/inicio/candidatos', appController.toCandidatos);
module.exports = router;