const express = require('express');
const routes = express();
const empleadosCtrl = require('../controllers/empleados.controller');
//const authMid = require('../middlewares/auth.middleware');

routes.get('/empleados', empleadosCtrl.obtenerEmpelados);
routes.post('/empleados', empleadosCtrl.crearEmpleado);
routes.put('/empleados/:id', empleadosCtrl.editarEmpleado);
routes.delete('/empleados/:id', empleadosCtrl.eliminarEmpleado);

module.exports = routes;
