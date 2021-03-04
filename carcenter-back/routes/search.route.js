const express = require('express');
const routes = express();
const searchCtrl = require('../controllers/search.controller');
const authMid = require('../middlewares/auth.middleware');

routes.get('/buscar/:frase', authMid.validaToken, searchCtrl.buscarTodos);
routes.get(
  '/buscar/:coleccion/:frase',
  authMid.validaToken,
  searchCtrl.buscarColeccion
);

module.exports = routes;
