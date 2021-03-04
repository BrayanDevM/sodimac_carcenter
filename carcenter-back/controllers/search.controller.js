'use strict';
const Medicos = require('../models/medicos.model');
const Usuarios = require('../models/usuarios.model');

const buscarTodos = async (req, res) => {
  // parám a expresión regular (para buscar mayúsculas o minúsculas)
  const frase = new RegExp(req.params.frase, 'i');

  Promise.all([buscarUsuarios(frase), buscarMedicos(frase)])
    .then((resultado) => {
      return res.status(200).json({
        ok: true,
        usuarios: resultado[0],
        medicos: resultado[1],
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        ok: false,
        message: 'Error al realizar búsqueda',
        error,
      });
    });
};

const buscarColeccion = (req, res) => {
  const coleccion = req.params.coleccion;
  const frase = new RegExp(req.params.frase, 'i');

  switch (coleccion) {
    case 'medicos':
      buscarMedicos(frase)
        .then((medicos) => {
          return res.status(200).json({
            ok: true,
            medicos,
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({
            ok: true,
            message: 'Error al buscar médicos',
            error,
          });
        });
      break;
    case 'usuarios':
      buscarUsuarios(frase)
        .then((usuarios) => {
          return res.status(200).json({
            ok: true,
            usuarios,
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({
            ok: true,
            message: 'Error al buscar usuarios',
            error,
          });
        });
      break;

    default:
      return res.status(400).json({
        ok: false,
        message: 'La colección de búsqueda no existe',
      });
  }
};

var controller = {
  searchInCollection: (req, res) => {
    var collection = req.params.nameCollection;
    var sentence = req.params.sentence;
    var regex = new RegExp(sentence, 'i');
    switch (collection) {
      case 'hospitals':
        searchHospitals(regex)
          .then((hospitals) => {
            res.status(200).json({
              ok: true,
              hospitals,
            });
          })
          .catch((error) => {
            res.status(500).json({
              ok: false,
              message: 'Error al consultar usuario',
              error,
            });
          });
        break;
      case 'doctors':
        searchDoctors(regex)
          .then((doctors) => {
            res.status(200).json({
              ok: true,
              doctors,
            });
          })
          .catch((error) => {
            res.status(500).json({
              ok: false,
              message: 'Error al consultar médico',
              error,
            });
          });
        break;
      case 'users':
        searchUsers(regex)
          .then((users) => {
            res.status(200).json({
              ok: true,
              users,
            });
          })
          .catch((error) => {
            res.status(500).json({
              ok: false,
              message: 'Error al consultar usuario',
              error,
            });
          });
        break;

      default:
        return res.status(400).json({
          ok: false,
          message: 'La colección a buscar no existe',
        });
        break;
    }
  },
};

const buscarMedicos = async (frase) => {
  return await Medicos.find({ nombre: frase });
};

const buscarUsuarios = async (frase) => {
  const campos = 'nombre correo documento sexo rol google';
  return await Usuarios.find({ nombre: frase }).select(campos);
};

module.exports = {
  buscarTodos,
  buscarColeccion,
};
