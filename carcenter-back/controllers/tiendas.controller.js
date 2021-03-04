'use strict';
const Conexion = require('../classes/conexion');
let db = new Conexion();

const obtenerTiendas = async (req, res) => {
  // paginación opcional
  const desde = Number(req.query.desde) || 0;
  const hasta = Number(req.query.hasta) || 0;

  try {
    const tiendas = await db.realizarConsulta(`SELECT * FROM TIENDAS`);
    return res.status(200).json({
      ok: true,
      tiendas: tiendas.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al traer tiendas',
      error,
    });
  }
};

const crearTienda = async (req, res) => {
  try {
    const body = req.body;
    const nuevaTienda = {
      nombre: body.nombre,
      direccion: body.direccion,
    };
    console.log(body, 'body enviado');
    const query = `INSERT INTO TIENDAS (NOMBRE, DIRECCION, ESTADO, CREADO_EL) VALUES (:NOMBRE, :DIRECCION, 'ACTIVA', SYSDATE)`;

    const tienda = await db.realizarConsulta(
      query,
      [nuevaTienda.nombre, nuevaTienda.direccion],
      true
    );

    res.status(200).json({
      ok: true,
      registro_id: tienda.lastRowid,
      registros_creados: tienda.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al crear tienda',
      error,
    });
  }
};

const editarTienda = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const tiendaEditada = {
      id_tienda: id,
      nombre: body.nombre,
      direccion: body.direccion,
      estado: body.estado,
    };

    const query = `UPDATE TIENDAS SET NOMBRE = :NOMBRE, DIRECCION = :DIRECCION, ESTADO = :ESTADO WHERE ID_TIENDA = :ID_TIENDA`;
    const tienda = await db.realizarConsulta(
      query,
      [
        tiendaEditada.nombre,
        tiendaEditada.direccion,
        tiendaEditada.estado,
        tiendaEditada.id_tienda,
      ],
      true
    );

    res.status(200).json({
      ok: true,
      registro_id: tienda.lastRowid,
      registros_creados: tienda.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar editar tienda',
      error,
    });
  }
};

const eliminarTienda = async (req, res) => {
  try {
    const id = req.params.id;
    const tiendaEliminada = await db.realizarConsulta(
      `DELETE FROM TIENDAS WHERE ID_TIENDA = ${id}`,
      [],
      true
    );

    return res.status(200).json({
      ok: true,
      message: 'Tienda eliminada correctamente',
      registros_afectados: tiendaEliminada.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar eliminar tienda',
      error,
    });
  }
};

module.exports = {
  obtenerTiendas,
  crearTienda,
  editarTienda,
  eliminarTienda,
};
