const express = require('express');
const routes = express();
const imagesCtrl = require('../controllers/imagenes.controller');
const authMid = require('../middlewares/auth.middleware');
const fileUpload = require('express-fileupload');

routes.use(fileUpload());

routes.get(
  '/img/:coleccion/:img',
  authMid.validaToken,
  imagesCtrl.obtenerImagen
);

routes.put('/img/:coleccion/:id', authMid.validaToken, imagesCtrl.subirImagen);

module.exports = routes;
