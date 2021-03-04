const express = require('express');
const routes = express();
const tiendasCtrl = require('../controllers/tiendas.controller');
//const authMid = require('../middlewares/auth.middleware');

routes.get('/tiendas', tiendasCtrl.obtenerTiendas);
routes.post('/tiendas', tiendasCtrl.crearTienda);
routes.put('/tiendas/:id', tiendasCtrl.editarTienda);
routes.delete('/tiendas/:id', tiendasCtrl.eliminarTienda);

module.exports = routes;
