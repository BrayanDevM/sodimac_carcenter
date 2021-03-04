'use strict';
const Conexion = require('../classes/conexion');
let db = new Conexion();
const tabla = 'REPUESTOS';

const obtenerRepuestos = async (req, res) => {
  // paginación opcional
  const desde = Number(req.query.desde) || 0;
  const hasta = Number(req.query.hasta) || 0;

  try {
    const repuestos = await db.realizarConsulta(`SELECT * FROM ${tabla}`);
    return res.status(200).json({
      ok: true,
      repuestos: repuestos.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al traer repuestos',
      error,
    });
  }
};

const crearRepuesto = async (req, res) => {
  try {
    const body = req.body;
    const nuevoRepuesto = {
      nombre: body.nombre,
      precio: body.precio,
      cantidad: body.cantidad,
      id_tienda: body.id_tienda,
    };
    console.log(body, 'body enviado');
    const query = `INSERT INTO ${tabla} (
      NOMBRE, 
      PRECIO, 
      CANTIDAD, 
      CREADO_EL,
      ID_TIENDA ) VALUES (
        :NOMBRE, 
        :PRECIO, 
        :CANTIDAD, 
        SYSDATE,
        :ID_TIENDA )`;

    const repuesto = await db.realizarConsulta(
      query,
      [
        nuevoRepuesto.nombre,
        nuevoRepuesto.precio,
        nuevoRepuesto.cantidad,
        nuevoRepuesto.id_tienda,
      ],
      true
    );

    res.status(200).json({
      ok: true,
      registro_id: repuesto.lastRowid,
      registros_creados: repuesto.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al crear repuesto',
      error,
    });
  }
};

const editarRepuesto = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const repuestoEditado = {
      id_repuesto: id,
      nombre: body.nombre,
      precio: body.precio,
      cantidad: body.cantidad,
    };

    const query = `UPDATE CLIENTES SET 
      NOMBRE = :NOMBRE,
      PRECIO = :PRECIO,
      CANTIDAD = :CANTIDAD,
      WHERE ID_REPUESTO = :ID_REPUESTO`;
    const repuesto = await db.realizarConsulta(
      query,
      [
        repuestoEditado.nombre,
        repuestoEditado.precio,
        repuestoEditado.cantidad,
        repuestoEditado.id_repuesto,
      ],
      true
    );

    res.status(200).json({
      ok: true,
      registro_id: repuesto.lastRowid,
      registros_creados: repuesto.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar editar repuesto',
      error,
    });
  }
};

const eliminarRepuesto = async (req, res) => {
  try {
    const id = req.params.id;
    const repuestoEliminado = await db.realizarConsulta(
      `DELETE FROM ${tabla} WHERE ID_REPUESTO = ${id}`,
      [],
      true
    );

    return res.status(200).json({
      ok: true,
      message: 'Repuesto eliminado correctamente',
      registros_afectados: repuestoEliminado.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar eliminar repuesto',
      error,
    });
  }
};

module.exports = {
  obtenerRepuestos,
  crearRepuesto,
  editarRepuesto,
  eliminarRepuesto,
};
