const express = require('express');
const routes = express();
const vehiculosCtrl = require('../controllers/vehiculos.controller');
//const authMid = require('../middlewares/auth.middleware');

routes.get('/vehiculos', vehiculosCtrl.obtenerVehiculos);
routes.post('/vehiculos', vehiculosCtrl.crearVehiculo);
routes.put('/vehiculos/:id', vehiculosCtrl.editarVehiculo);
routes.delete('/vehiculos/:id', vehiculosCtrl.eliminarVehiculo);

module.exports = routes;
