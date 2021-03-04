'use strict';
const Conexion = require('../classes/conexion');
let db = new Conexion();
const tabla = 'MANTENIMIENTOS';

const obtenerMantenimientos = async (req, res) => {
  // paginación opcional
  const desde = Number(req.query.desde) || 0;
  const hasta = Number(req.query.hasta) || 0;

  try {
    const mantenimientos = await db.realizarConsulta(`SELECT * FROM ${tabla}`);
    return res.status(200).json({
      ok: true,
      mantenimientos: mantenimientos.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al traer mantenimientos',
      error,
    });
  }
};

const crearMantenimiento = async (req, res) => {
  try {
    const body = req.body;
    const nuevoMantenim = {
      nombre: body.nombre,
      precio: body.precio,
      id_tienda: body.id_tienda,
    };
    console.log(body, 'body enviado');
    const query = `INSERT INTO ${tabla} (
      NOMBRE, 
      PRECIO, 
      CREADO_EL,
      ID_TIENDA ) VALUES (
        :NOMBRE, 
        :PRECIO, 
        SYSDATE,
        :ID_TIENDA )`;

    const mantenimiento = await db.realizarConsulta(
      query,
      [nuevoMantenim.nombre, nuevoMantenim.precio, nuevoMantenim.id_tienda],
      true
    );

    res.status(200).json({
      ok: true,
      registro_id: mantenimiento.lastRowid,
      registros_creados: mantenimiento.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al crear mantenimiento',
      error,
    });
  }
};

const editarMantenimiento = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const mantenimEditado = {
      id_mantenimiento: id,
      nombre: body.nombre,
      precio: body.precio,
    };

    const query = `UPDATE CLIENTES SET 
      NOMBRE = :NOMBRE,
      PRECIO = :PRECIO,
      WHERE ID_MANTENIMIENTO = :ID_MANTENIMIENTO`;
    const mantenim = await db.realizarConsulta(
      query,
      [
        mantenimEditado.nombre,
        mantenimEditado.precio,
        mantenimEditado.id_mantenimiento,
      ],
      true
    );

    res.status(200).json({
      ok: true,
      registro_id: mantenim.lastRowid,
      registros_creados: mantenim.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar editar mantenimiento',
      error,
    });
  }
};

const eliminarMantenimiento = async (req, res) => {
  try {
    const id = req.params.id;
    const mantenimEliminado = await db.realizarConsulta(
      `DELETE FROM ${tabla} WHERE ID_MANTENIMIENTO = ${id}`,
      [],
      true
    );

    return res.status(200).json({
      ok: true,
      message: 'Mantenimiento eliminado correctamente',
      registros_afectados: mantenimEliminado.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar eliminar mantenimiento',
      error,
    });
  }
};

module.exports = {
  obtenerMantenimientos,
  crearMantenimiento,
  editarMantenimiento,
  eliminarMantenimiento,
};
