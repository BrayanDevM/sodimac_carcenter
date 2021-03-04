// Dependencias
require('dotenv').config();
const oracledb = require('oracledb');
const express = require('express');
const bodyParser = require('body-parser');
const Conexion = require('./classes/conexion');

// Inicializar variables
const app = express();
const puerto = process.env.PORT || 8081;

// Configurar cabeceras y cors (acceso)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// body-parser config application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config BD
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Conexión BD
let conexion = new Conexion();
conexion.conectarBD().then(() => {
  console.log(
    '\x1b[32m%s\x1b[0m \x1b[33m%s\x1b[0m conectado',
    'Oracle DB',
    '[sodimac_carcenter]'
  );
});

// Configuración y uso de rutas
const rutas = require('./routes/_rutas');
app.use('/', rutas);

// Iniciar servidor
app.listen(puerto, () => {
  console.log(
    `\x1b[32m%s\x1b[0m en: http://localhost:${puerto}/`,
    'Servidor Express iniciado'
  );
});
