const express = require('express');
const routes = express();
const repuestosCtrl = require('../controllers/repuestos.controller');
//const authMid = require('../middlewares/auth.middleware');

routes.get('/repuestos', repuestosCtrl.obtenerRepuestos);
routes.post('/repuestos', repuestosCtrl.crearRepuesto);
routes.put('/repuestos/:id', repuestosCtrl.editarRepuesto);
routes.delete('/repuestos/:id', repuestosCtrl.eliminarRepuesto);

module.exports = routes;
