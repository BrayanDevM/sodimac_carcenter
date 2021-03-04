'use strict';
const Medicos = require('../models/medicos.model');
const Usuarios = require('../models/usuarios.model');
const fs = require('fs');

/**
 * retorna imagen solicitada, en caso de no existir
 * retorna img por defecto noImage.png
 */
const obtenerImagen = (req, res) => {
  const coleccion = req.params.coleccion;
  const img = req.params.img;
  let ruta = `uploads/img/${coleccion}/${img}`;

  fs.readFile(ruta, (error) => {
    if (error) ruta = 'assets/img/noImage.png';
    res.sendFile(ruta, { root: '.' });
  });
};

const subirImagen = (req, res) => {
  try {
    const coleccion = req.params.coleccion;
    const id = req.params.id;
    const colecciones = ['usuarios', 'medicos'];

    if (!colecciones.includes(coleccion)) {
      throw {
        message: 'La colección indicada no existe',
      };
    } else if (!req.files) {
      throw {
        message: 'No has seleccionado ninguna imagen',
      };
    }

    // Obtener archivo del archivo y su extensión
    const img = req.files.img;
    const imgNombre = img.name.split('.');
    const imgExt = imgNombre[imgNombre.length - 1];
    const extencionesValidas = ['jpg', 'jpeg', 'png', 'gif'];

    if (!extencionesValidas.includes(imgExt)) {
      throw {
        message: 'La extensión del archivo no es válida',
        errors: {
          extension: imgExt,
          descripcion: `Extensiones válidas: ${validExtensions.join(', ')}`,
        },
      };
    }

    // Crear nombre personalizado (evita duplicados)
    // Nombre: IdUsuario-msDelMomento.extensión
    const nuevoNombreImg = `${id}-${new Date().getMilliseconds()}.${imgExt}`;

    // Creamos la ruta con la colección y el nuevo nombre
    const rutaImg = `uploads/img/${coleccion}/${nuevoNombreImg}`;

    guardarEnColeccion(coleccion, id, nuevoNombreImg, res, rutaImg, img);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      message: error.message,
      error: error.errors,
    });
  }
};

// MÉTODOS NO EXPORTADOS ************************************************
/**
 * Según la colección donde se desea guardar la img se realiza
 * el proceso de guardado
 * @param {*} coleccion nombre de coleccion para switch
 * @param {*} id del registro donde se guardará la img
 * @param {*} nuevoNombreImg nombre modificado de la img
 * @param {*} res response
 * @param {*} rutaImg ruta donde se guarda la img
 * @param {*} img objeto con la imagen
 */
const guardarEnColeccion = async (
  coleccion,
  id,
  nuevoNombreImg,
  res,
  rutaImg,
  img
) => {
  switch (coleccion) {
    case 'medicos':
      try {
        const medico = await Medicos.findById(id);
        if (medico) {
          eliminarImgAnterior(coleccion, medico.img).then(async () => {
            medico.img = nuevoNombreImg;
            const medicoEditado = await medico.save();
            // Si todo es correcto, movemos la imagen
            img.mv(rutaImg, (error) => {
              if (error) {
                return res.status(500).json({
                  ok: false,
                  message: 'No se ha podido guardar la imagen',
                  error,
                });
              } else {
                return res.status(200).json({
                  ok: true,
                  medicoEditado,
                });
              }
            });
          });
        } else {
          return res.status(400).json({
            ok: false,
            message: 'No existe un médico con ese id',
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          ok: false,
          message: 'Error al intentar guardar imagen en colección Medicos',
          error,
        });
      }
      break;
    default:
      try {
        const usuario = await Usuarios.findById(id);
        if (usuario) {
          eliminarImgAnterior(coleccion, usuario.img).then(async () => {
            usuario.img = nuevoNombreImg;
            const usuarioEditado = await usuario.save();
            // Si todo es correcto, movemos la imagen
            img.mv(rutaImg, (error) => {
              if (error) {
                return res.status(500).json({
                  ok: false,
                  message: 'No se ha podido guardar la imagen',
                  error,
                });
              } else {
                return res.status(200).json({
                  ok: true,
                  usuarioEditado,
                });
              }
            });
          });
        } else {
          return res.status(400).json({
            ok: false,
            message: 'No existe un médico con ese id',
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          ok: false,
          message: 'Error al intentar guardar imagen en colección Medicos',
          error,
        });
      }
      break;
  }
};

const eliminarImgAnterior = async (coleccion, img) => {
  try {
    if (img !== '') {
      const rutaImgAnterior = `uploads/img/${coleccion}/${img}`;
      if (fs.existsSync(rutaImgAnterior)) fs.unlinkSync(rutaImgAnterior);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  obtenerImagen,
  subirImagen,
};
