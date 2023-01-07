const { Router } = require('express');
const router = Router();
const cors = require('cors');

router.use(cors());

// Controllers
const vacantesController = require('../controllers/vacantes.controller');
const unidadesController = require('../controllers/unidades-eco.controller'); // FUNCIONES DEL CONTROLADOR
const candidatosIntController = require('../controllers/can-internos.controller');
const candidatosExtController = require('../controllers/can-externos.controller');
const adminsSistemaController = require('../controllers/adminsSistema.controller');
// Rutas 
router.post('/',(req, res) => res.send("Bolsa de Trabajo API - CGTIE - TESE ->    " + req.method)); 
router.get('/',(req,res)=> res.send("Bolsa de Trabajo API - CGTIE - TESE ->    " + req.method));

// Rutas Unidades
router.get('/api/unidades-eco',unidadesController.getUnidadesEco);
router.post('/api/unidades-eco',unidadesController.postUnidadesEco);

// Rutas Vacantes
router.get('/api/vacantes',vacantesController.getVacantes);
router.post('/api/vacantes',vacantesController.postVacantes);

// Rutas Candidatos Internos
router.get('/api/can-internos',candidatosIntController.getCanInternos);

// Rutas Candidatos Externos
router.get('/api/can-externos',candidatosExtController.getCanExternos);

// Rutas Usuarios Sistema de Administración
router.get('/api/admins-sistema',adminsSistemaController.getAdminsSistema);
router.post('/api/admins-sistema',adminsSistemaController.checkAdminsSistema);

module.exports = router;