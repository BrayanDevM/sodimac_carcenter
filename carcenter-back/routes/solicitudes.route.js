const express = require('express');
const routes = express();
const solicitudesCtrl = require('../controllers/solicitudes.controller');
//const authMid = require('../middlewares/auth.middleware');

routes.get('/solicitudes', solicitudesCtrl.obtenerSolicitudes);
routes.post('/solicitudes', solicitudesCtrl.crearSolicitud);
routes.put('/solicitudes/:id', solicitudesCtrl.editarSolicitud);
routes.delete('/solicitudes/:id', solicitudesCtrl.eliminarSolicitud);

module.exports = routes;
