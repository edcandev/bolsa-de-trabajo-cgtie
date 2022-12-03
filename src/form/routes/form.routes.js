const { Router } = require('express');
const router = Router();
const path = require('path');

const formController = require('../controllers/index.controller');

// La ruta "/" es equivalente a "index.html"
router.get('/form/registro',formController.getIndexPage);
router.post('/form/registro',formController.validandoPostVacantes);

router.get('/form/ok',formController.datosEnviados);

module.exports = router;