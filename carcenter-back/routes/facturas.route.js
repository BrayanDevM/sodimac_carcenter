const express = require('express');
const routes = express();
const facturasCtrl = require('../controllers/facturas.controller');
//const authMid = require('../middlewares/auth.middleware');

routes.get('/facturas', facturasCtrl.obtenerFacturas);
routes.post('/facturas', facturasCtrl.crearFactura);
// routes.put('/mantenimientos/:id', facturasCtrl.editarMantenimiento);
// routes.delete('/mantenimientos/:id', facturasCtrl.eliminarMantenimiento);

module.exports = routes;
