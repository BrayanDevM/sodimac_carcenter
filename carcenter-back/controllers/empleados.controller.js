'use strict';
const Conexion = require('../classes/conexion');
let db = new Conexion();
const tabla = 'EMPLEADOS';

const obtenerEmpelados = async (req, res) => {
  // paginación opcional
  const desde = Number(req.query.desde) || 0;
  const hasta = Number(req.query.hasta) || 0;

  try {
    const empleados = await db.realizarConsulta(`SELECT * FROM ${tabla}`);
    return res.status(200).json({
      ok: true,
      empleados: empleados.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al traer empleados',
      error,
    });
  }
};

const crearEmpleado = async (req, res) => {
  try {
    const body = req.body;
    const nuevoEmpleado = {
      nombre_1: body.nombre_1,
      nombre_2: body.nombre_2,
      apellido_1: body.apellido_1,
      apellido_2: body.apellido_2,
      tipo_doc: body.tipo_doc,
      documento: body.documento,
      celular: body.celular,
      direccion: body.direccion,
      correo: body.correo,
      estado: 'ACTIVO',
      id_tienda: body.id_tienda,
    };
    console.log(body, 'body enviado');
    const query = `INSERT INTO ${tabla} (
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

    const empleado = await db.realizarConsulta(
      query,
      [
        nuevoEmpleado.nombre_1,
        nuevoEmpleado.nombre_2,
        nuevoEmpleado.apellido_1,
        nuevoEmpleado.apellido_2,
        nuevoEmpleado.tipo_doc,
        nuevoEmpleado.documento,
        nuevoEmpleado.celular,
        nuevoEmpleado.direccion,
        nuevoEmpleado.correo,
        nuevoEmpleado.estado,
        nuevoEmpleado.id_tienda,
      ],
      true
    );

    res.status(200).json({
      ok: true,
      registro_id: empleado.lastRowid,
      registros_creados: empleado.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al crear empleado',
      error,
    });
  }
};

const editarEmpleado = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const empleadoEditado = {
      id_empleado: id,
      nombre_1: body.nombre_1,
      nombre_2: body.nombre_2,
      apellido_1: body.apellido_1,
      apellido_2: body.apellido_2,
      tipo_doc: body.tipo_doc,
      documento: body.documento,
      celular: body.celular,
      direccion: body.direccion,
      correo: body.correo,
      estado: body.estado,
      id_tienda: body.id_tienda,
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
      WHERE ID_EMPLEADO = :ID_EMPLEADO`;
    const empleado = await db.realizarConsulta(
      query,
      [
        empleadoEditado.nombre_1,
        empleadoEditado.nombre_2,
        empleadoEditado.apellido_1,
        empleadoEditado.apellido_2,
        empleadoEditado.tipo_doc,
        empleadoEditado.documento,
        empleadoEditado.celular,
        empleadoEditado.direccion,
        empleadoEditado.correo,
        empleadoEditado.estado,
        empleadoEditado.id_empleado,
      ],
      true
    );

    res.status(200).json({
      ok: true,
      registro_id: empleado.lastRowid,
      registros_creados: empleado.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar editar empleado',
      error,
    });
  }
};

const eliminarEmpleado = async (req, res) => {
  try {
    const id = req.params.id;
    const empleadoEliminado = await db.realizarConsulta(
      `DELETE FROM ${tabla} WHERE ID_EMPLEADO = ${id}`,
      [],
      true
    );

    return res.status(200).json({
      ok: true,
      message: 'Empleado eliminado correctamente',
      registros_afectados: empleadoEliminado.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar eliminar empleado',
      error,
    });
  }
};

module.exports = {
  obtenerEmpelados,
  crearEmpleado,
  editarEmpleado,
  eliminarEmpleado,
};
