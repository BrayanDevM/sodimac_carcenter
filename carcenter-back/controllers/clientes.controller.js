'use strict';
const Conexion = require('../classes/conexion');
let db = new Conexion();
const tabla = 'CLIENTES';

const obtenerClientes = async (req, res) => {
  // paginación opcional
  const desde = Number(req.query.desde) || 0;
  const hasta = Number(req.query.hasta) || 0;

  try {
    const clientes = await db.realizarConsulta(`SELECT * FROM ${tabla}`);
    return res.status(200).json({
      ok: true,
      clientes: clientes.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al traer clientes',
      error,
    });
  }
};

const obtenerCliente = async (req, res) => {
  try {
    const documento = req.params.doc;
    const query = `SELECT * FROM ${tabla} WHERE DOCUMENTO = ${documento}`;
    const cliente = await db.realizarConsulta(query);
    return res.status(200).json({
      ok: true,
      cliente: cliente.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al traer cliente',
      error,
    });
  }
};

const crearCliente = async (req, res) => {
  try {
    const body = req.body;
    const nuevoCliente = {
      NOMBRE_1: body.NOMBRE_1,
      NOMBRE_2: body.NOMBRE_2,
      APELLIDO_1: body.APELLIDO_1,
      APELLIDO_2: body.APELLIDO_2,
      TIPO_DOC: body.TIPO_DOC,
      DOCUMENTO: body.DOCUMENTO,
      CELULAR: body.CELULAR,
      DIRECCION: body.DIRECCION,
      CORREO: body.CORREO,
      ESTADO: 'ACTIVO',
      ID_TIENDA: body.ID_TIENDA,
    };
    console.log(body, 'body enviado');
    const query = `INSERT INTO CLIENTES (
      NOMBRE_1, 
      NOMBRE_2, 
      APELLIDO_1, 
      APELLIDO_2,
      TIPO_DOC,
      DOCUMENTO,
      CELULAR,
      DIRECCION,
      CORREO,
      ESTADO, 
      CREADO_EL,
      ID_TIENDA) VALUES (
        :NOMBRE_1, 
        :NOMBRE_2, 
        :APELLIDO_1, 
        :APELLIDO_2,
        :TIPO_DOC,
        :DOCUMENTO,
        :CELULAR,
        :DIRECCION,
        :CORREO,
        :ESTADO, 
        SYSDATE,
        :ID_TIENDA
      )`;

    const cliente = await db.realizarConsulta(
      query,
      [
        nuevoCliente.NOMBRE_1,
        nuevoCliente.NOMBRE_2,
        nuevoCliente.APELLIDO_1,
        nuevoCliente.APELLIDO_2,
        nuevoCliente.TIPO_DOC,
        nuevoCliente.DOCUMENTO,
        nuevoCliente.CELULAR,
        nuevoCliente.DIRECCION,
        nuevoCliente.CORREO,
        nuevoCliente.ESTADO,
        nuevoCliente.ID_TIENDA,
      ],
      true
    );

    res.status(200).json({
      ok: true,
      registro_id: cliente.lastRowid,
      registros_creados: cliente.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al crear cliente',
      error,
    });
  }
};

const editarCliente = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const clienteEditado = {
      ID_CLIENTE: id,
      NOMBRE_1: body.NOMBRE_1,
      NOMBRE_2: body.NOMBRE_2,
      APELLIDO_1: body.APELLIDO_1,
      APELLIDO_2: body.APELLIDO_2,
      TIPO_DOC: body.TIPO_DOC,
      DOCUMENTO: body.DOCUMENTO,
      CELULAR: body.CELULAR,
      DIRECCION: body.DIRECCION,
      CORREO: body.CORREO,
      ESTADO: 'ACTIVO',
      ID_TIENDA: body.ID_TIENDA,
    };

    const query = `UPDATE CLIENTES SET 
      NOMBRE_1 = :NOMBRE_1,
      NOMBRE_2 = :NOMBRE_2,
      APELLIDO_1 = :APELLIDO_1,
      APELLIDO_2 = :APELLIDO_2,
      TIPO_DOC = :TIPO_DOC,
      DOCUMENTO = :DOCUMENTO,
      CELULAR = :CELULAR,
      DIRECCION = :DIRECCION,
      CORREO = :CORREO,
      ESTADO = :ESTADO,
      WHERE ID_CLIENTE = :ID_CLIENTE`;
    const tienda = await db.realizarConsulta(
      query,
      [
        clienteEditado.NOMBRE_1,
        clienteEditado.NOMBRE_2,
        clienteEditado.APELLIDO_1,
        clienteEditado.APELLIDO_2,
        clienteEditado.TIPO_DOC,
        clienteEditado.DOCUMENTO,
        clienteEditado.CELULAR,
        clienteEditado.DIRECCION,
        clienteEditado.CORREO,
        clienteEditado.ESTADO,
        clienteEditado.ID_CLIENTE,
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
      message: 'Error al intentar editar cliente',
      error,
    });
  }
};

const eliminarCliente = async (req, res) => {
  try {
    const id = req.params.id;
    const clienteEliminado = await db.realizarConsulta(
      `DELETE FROM CLIENTES WHERE ID_CLIENTE = ${id}`,
      [],
      true
    );

    return res.status(200).json({
      ok: true,
      message: 'Cliente eliminado correctamente',
      registros_afectados: clienteEliminado.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar eliminar cliente',
      error,
    });
  }
};

module.exports = {
  obtenerClientes,
  crearCliente,
  editarCliente,
  eliminarCliente,
};
