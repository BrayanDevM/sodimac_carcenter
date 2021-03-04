const jwt = require('jsonwebtoken');

/**
 * Este middleware requiere el envío de un token de usuario, es decir,
 * para continuar con la petición al servidor, se debe haber inciado sesión,
 * una vez validado se agrega a la request una variable llamada 'solicitante'
 * con el _id del usuario que realiza la petición, esta se puede usar en la
 * petición para ej. crear un registro y asignar su creador.
 *
 * + solicitanteRol: para validacion de roles con middleware
 */
exports.validaToken = (req, res, next) => {
  const token = req.query.token;
  jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        message: 'Token de autenticación inválido',
        error: err,
      });
    }
    req.solicitante = decoded.usuario._id;
    req.solicitanteRol = decoded.usuario.rol;
    next();
  });
};

/**
 * Si el solicitante no tiene rol 'ADMIN' retorna error
 */
exports.validaAdmin = (req, res, next) => {
  const usuarioRol = req.solicitanteRol;
  if (usuarioRol !== 'ADMIN') {
    return res.status(401).json({
      ok: false,
      message: 'Debes ser administrador para continuar',
    });
  } else {
    next();
  }
};
