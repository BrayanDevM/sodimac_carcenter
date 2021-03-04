'use strict';
const Conexion = require('../classes/conexion');
let db = new Conexion();
const tabla = 'SOLICITUDES';

const obtenerSolicitudes = async (req, res) => {
  // paginación opcional
  const desde = Number(req.query.desde) || 0;
  const hasta = Number(req.query.hasta) || 0;
  const cliente_id = req.query.cliente_id;
  let query = '';

  cliente_id
    ? (query = `SELECT * FROM ${tabla} s 
  FULL OUTER JOIN VEHICULOS v 
  ON s.ID_VEHICULO = v.ID_VEHICULO 
  FULL OUTER JOIN CLIENTES c 
  ON v.ID_CLIENTE = c.ID_CLIENTE
  WHERE v.ID_CLIENTE = ${cliente_id}`)
    : (query = `SELECT * FROM ${tabla} s 
  FULL OUTER JOIN VEHICULOS v 
  ON s.ID_VEHICULO = v.ID_VEHICULO 
  FULL OUTER JOIN CLIENTES c ON v.ID_CLIENTE = c.ID_CLIENTE`);

  try {
    const solicitudes = await db.realizarConsulta(query);
    return res.status(200).json({
      ok: true,
      solicitudes: solicitudes.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al traer solicitudes',
      error,
    });
  }
};

const crearSolicitud = async (req, res) => {
  try {
    const body = req.body;
    const nuevaSolicitud = {
      DESCRIPCION: body.DESCRIPCION,
      ID_VEHICULO: body.ID_VEHICULO,
      ESTADO: 'INCOMPLETA',
    };
    console.log(body, 'body enviado');
    const query = `INSERT INTO ${tabla} (
      DESCRIPCION,
      ID_VEHICULO,
      ESTADO, 
      CREADO_EL
      ) VALUES (
        :DESCRIPCION,
        :ID_VEHICULO,
        :ESTADO, 
        SYSDATE )`;

    const solicitud = await db.realizarConsulta(
      query,
      [
        nuevaSolicitud.DESCRIPCION,
        nuevaSolicitud.ID_VEHICULO,
        nuevaSolicitud.ESTADO,
      ],
      true
    );

    res.status(200).json({
      ok: true,
      registro_id: solicitud.lastRowid,
      registros_creados: solicitud.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al crear solicitud',
      error,
    });
  }
};

const editarSolicitud = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const solicitudEditada = {
      ID_SOLICITUD: Number.parseInt(id),
      DESCRIPCION: body.DESCRIPCION,
      ID_VEHICULO: body.ID_VEHICULO,
      ESTADO: body.ESTADO,
    };

    console.log(solicitudEditada, 'solicitud editada');

    const query = `UPDATE ${tabla} SET 
      DESCRIPCION = :DESCRIPCION,
      ID_VEHICULO = :ID_VEHICULO,
      ESTADO = :ESTADO
      WHERE ID_SOLICITUD = :ID_SOLICITUD`;
    const solicitud = await db.realizarConsulta(
      query,
      [
        solicitudEditada.DESCRIPCION,
        solicitudEditada.ID_VEHICULO,
        solicitudEditada.ESTADO,
        solicitudEditada.ID_SOLICITUD,
      ],
      true
    );

    res.status(200).json({
      ok: true,
      registro_id: solicitud.lastRowid,
      registros_creados: solicitud.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar editar solicitud',
      error,
    });
  }
};

const eliminarSolicitud = async (req, res) => {
  try {
    const id = req.params.id;
    const solicitudEliminada = await db.realizarConsulta(
      `DELETE FROM ${tabla} WHERE ID_SOLICITUD = ${id}`,
      [],
      true
    );

    return res.status(200).json({
      ok: true,
      message: 'Repuesto eliminado correctamente',
      registros_afectados: solicitudEliminada.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar eliminar solicitud',
      error,
    });
  }
};

module.exports = {
  obtenerSolicitudes,
  crearSolicitud,
  editarSolicitud,
  eliminarSolicitud,
};
