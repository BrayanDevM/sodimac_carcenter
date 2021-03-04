const express = require('express');
const routes = express();
const clientesCtrl = require('../controllers/clientes.controller');
//const authMid = require('../middlewares/auth.middleware');

routes.get('/clientes', clientesCtrl.obtenerClientes);
routes.get('/clientes/:doc', clientesCtrl.obtenerClientes);
routes.post('/clientes', clientesCtrl.crearCliente);
routes.put('/clientes/:id', clientesCtrl.editarCliente);
routes.delete('/clientes/:id', clientesCtrl.eliminarCliente);

module.exports = routes;
