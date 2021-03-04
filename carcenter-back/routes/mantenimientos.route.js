const express = require('express');
const routes = express();
const mantenimCtrl = require('../controllers/mantenimientos.controller');
//const authMid = require('../middlewares/auth.middleware');

routes.get('/mantenimientos', mantenimCtrl.obtenerMantenimientos);
routes.post('/mantenimientos', mantenimCtrl.crearMantenimiento);
routes.put('/mantenimientos/:id', mantenimCtrl.editarMantenimiento);
routes.delete('/mantenimientos/:id', mantenimCtrl.eliminarMantenimiento);

module.exports = routes;
