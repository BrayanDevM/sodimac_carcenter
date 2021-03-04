// const rutasUsuarios = require('../routes/usuarios.route');
const rutasTiendas = require('../routes/tiendas.route');
const rutasClientes = require('../routes/clientes.route');
const rutasEmpleados = require('../routes/empleados.route');
const rutasVehiculos = require('../routes/vehiculos.route');
const rutasRepuestos = require('../routes/repuestos.route');
const rutasSolicitudes = require('../routes/solicitudes.route');
const rutasMantenimientos = require('../routes/mantenimientos.route');
const rutasFacturas = require('../routes/facturas.route');

module.exports = [
  rutasTiendas,
  rutasClientes,
  rutasEmpleados,
  rutasVehiculos,
  rutasRepuestos,
  rutasSolicitudes,
  rutasMantenimientos,
  rutasFacturas,
];
