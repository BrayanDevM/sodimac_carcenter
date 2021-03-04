'use strict';
const Conexion = require('../classes/conexion');
let db = new Conexion();
const tabla = 'VEHICULOS';

const obtenerVehiculos = async (req, res) => {
  // paginación opcional
  const desde = Number(req.query.desde) || 0;
  const hasta = Number(req.query.hasta) || 0;
  const cliente_id = req.query.cliente_id;

  try {
    const vehiculos = await db.realizarConsulta(
      `SELECT * FROM ${tabla} WHERE ID_CLIENTE = ${cliente_id}`
    );
    return res.status(200).json({
      ok: true,
      vehiculos: vehiculos.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al traer vehiculos',
      error,
    });
  }
};

const crearVehiculo = async (req, res) => {
  try {
    const body = req.body;
    const nuevoVehiculo = {
      MARCA: body.MARCA,
      MODELO: body.MODELO,
      MODELO_FECHA: body.MODELO_FECHA,
      PLACA: body.PLACA,
      COLOR: body.COLOR,
      ID_CLIENTE: body.ID_CLIENTE,
    };
    console.log(body, 'body enviado');
    const query = `INSERT INTO ${tabla} (
      MARCA, 
      MODELO, 
      MODELO_FECHA, 
      PLACA,
      COLOR,
      CREADO_EL,
      ID_CLIENTE ) VALUES (
        :MARCA, 
        :MODELO, 
        :MODELO_FECHA, 
        :PLACA,
        :COLOR,
        SYSDATE,
        :ID_CLIENTE )`;

    const vehiculo = await db.realizarConsulta(
      query,
      [
        nuevoVehiculo.MARCA,
        nuevoVehiculo.MODELO,
        nuevoVehiculo.MODELO_FECHA,
        nuevoVehiculo.PLACA,
        nuevoVehiculo.COLOR,
        nuevoVehiculo.ID_CLIENTE,
      ],
      true
    );

    res.status(200).json({
      ok: true,
      registro_id: vehiculo.lastRowid,
      registros_creados: vehiculo.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al crear vehiculo',
      error,
    });
  }
};

const editarVehiculo = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const vehiculoEditado = {
      ID_VEHICULO: id,
      MARCA: body.MARCA,
      MODELO: body.MODELO,
      MODELO_FECHA: body.MODELO_FECHA,
      PLACA: body.PLACA,
      COLOR: body.COLOR,
      ID_CLIENTE: body.ID_CLIENTE,
    };

    const query = `UPDATE CLIENTES SET 
      MARCA = :MARCA,
      MODELO = :MODELO,
      MODELO_FECHA = :MODELO_FECHA,
      PLACA = :PLACA,
      COLOR = :COLOR,
      WHERE ID_VEHICULO = :ID_VEHICULO`;
    const vehiculo = await db.realizarConsulta(
      query,
      [
        vehiculoEditado.MARCA,
        vehiculoEditado.MODELO,
        vehiculoEditado.MODELO_FECHA,
        vehiculoEditado.PLACA,
        vehiculoEditado.COLOR,
        vehiculoEditado.ID_CLIENTE,
      ],
      true
    );

    res.status(200).json({
      ok: true,
      registro_id: vehiculo.lastRowid,
      registros_creados: vehiculo.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar editar vehiculo',
      error,
    });
  }
};

const eliminarVehiculo = async (req, res) => {
  try {
    const id = req.params.id;
    const vehiculoEliminado = await db.realizarConsulta(
      `DELETE FROM ${tabla} WHERE ID_VEHICULO = ${id}`,
      [],
      true
    );

    return res.status(200).json({
      ok: true,
      message: 'Vehiculo eliminado correctamente',
      registros_afectados: vehiculoEliminado.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar eliminar vehiculo',
      error,
    });
  }
};

module.exports = {
  obtenerVehiculos,
  crearVehiculo,
  editarVehiculo,
  eliminarVehiculo,
};
