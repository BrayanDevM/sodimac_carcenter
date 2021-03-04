'use strict';
const Conexion = require('../classes/conexion');
let db = new Conexion();
const tabla = 'FACTURAS';

const obtenerFacturas = async (req, res) => {
  // paginación opcional
  const desde = Number(req.query.desde) || 0;
  const hasta = Number(req.query.hasta) || 0;
  const id_cliente = req.query.id_cliente;
  let query = '';

  id_cliente
    ? (query = `SELECT * FROM ${tabla} f
    FULL OUTER JOIN VEHICULOS v 
    ON f.ID_VEHICULO = v.ID_VEHICULO
    FULL OUTER JOIN CLIENTES c 
    ON v.ID_CLIENTE = c.ID_CLIENTE
    FULL OUTER JOIN EMPLEADOS e
    ON f.ID_EMPLEADO = e.ID_EMPLEADO
    WHERE v.ID_CLIENTE = ${id_cliente}`)
    : (query = `SELECT * FROM ${tabla}`);

  try {
    const facturas = await db.realizarConsulta(query);
    return res.status(200).json({
      ok: true,
      facturas: facturas.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al traer facturas',
      error,
    });
  }
};

const crearFactura = async (req, res) => {
  try {
    const body = req.body;
    const nuevaFactura = {
      ID_VEHICULO: body.ID_VEHICULO,
      ID_EMPLEADO: body.ID_EMPLEADO,
      MANTENIMIENTO_1: body.MANTENIMIENTO_1,
      MANTENIMIENTO_2: body.MANTENIMIENTO_2,
      MANTENIMIENTO_3: body.MANTENIMIENTO_3,
      MANTENIMIENTO_4: body.MANTENIMIENTO_4,
      MANTENIMIENTO_5: body.MANTENIMIENTO_5,
      MANTENIMIENTO_6: body.MANTENIMIENTO_6,
      MANTENIMIENTO_7: body.MANTENIMIENTO_7,
      MANTENIMIENTO_8: body.MANTENIMIENTO_8,
      MANTENIMIENTO_9: body.MANTENIMIENTO_9,
      REPUESTO_1: body.REPUESTO_1,
      REPUESTO_2: body.REPUESTO_2,
      REPUESTO_3: body.REPUESTO_3,
      REPUESTO_4: body.REPUESTO_4,
      REPUESTO_5: body.REPUESTO_5,
      REPUESTO_6: body.REPUESTO_6,
      REPUESTO_7: body.REPUESTO_7,
      REPUESTO_8: body.REPUESTO_8,
      REPUESTO_9: body.REPUESTO_9,
      TOTAL: body.TOTAL,
      UTILIDAD: body.UTILIDAD,
      ID_TIENDA: body.ID_TIENDA,
      ID_SOLICITUD: body.ID_SOLICITUD,
    };
    console.log(body, 'body enviado');
    const query = `INSERT INTO ${tabla} (
      ID_VEHICULO, 
      ID_EMPLEADO, 
      MANTENIMIENTO_1,
      MANTENIMIENTO_2,
      MANTENIMIENTO_3,
      MANTENIMIENTO_4,
      MANTENIMIENTO_5,
      MANTENIMIENTO_6,
      MANTENIMIENTO_7,
      MANTENIMIENTO_8,
      MANTENIMIENTO_9,
      REPUESTO_1,
      REPUESTO_2,
      REPUESTO_3,
      REPUESTO_4,
      REPUESTO_5,
      REPUESTO_6,
      REPUESTO_7,
      REPUESTO_8,
      REPUESTO_9,
      TOTAL,
      UTILIDAD,
      FECHA,
      ID_TIENDA,
      ID_SOLICITUD ) VALUES (
        :ID_VEHICULO, 
        :ID_EMPLEADO, 
        :MANTENIMIENTO_1,
        :MANTENIMIENTO_2,
        :MANTENIMIENTO_3,
        :MANTENIMIENTO_4,
        :MANTENIMIENTO_5,
        :MANTENIMIENTO_6,
        :MANTENIMIENTO_7,
        :MANTENIMIENTO_8,
        :MANTENIMIENTO_9,
        :REPUESTO_1,
        :REPUESTO_2,
        :REPUESTO_3,
        :REPUESTO_4,
        :REPUESTO_5,
        :REPUESTO_6,
        :REPUESTO_7,
        :REPUESTO_8,
        :REPUESTO_9,
        :TOTAL,
        0,
        SYSDATE,
        :ID_TIENDA,
        :ID_SOLICITUD )`;

    const factura = await db.realizarConsulta(
      query,
      [
        nuevaFactura.ID_VEHICULO,
        nuevaFactura.ID_EMPLEADO,
        nuevaFactura.MANTENIMIENTO_1,
        nuevaFactura.MANTENIMIENTO_2,
        nuevaFactura.MANTENIMIENTO_3,
        nuevaFactura.MANTENIMIENTO_4,
        nuevaFactura.MANTENIMIENTO_5,
        nuevaFactura.MANTENIMIENTO_6,
        nuevaFactura.MANTENIMIENTO_7,
        nuevaFactura.MANTENIMIENTO_8,
        nuevaFactura.MANTENIMIENTO_9,
        nuevaFactura.REPUESTO_1,
        nuevaFactura.REPUESTO_2,
        nuevaFactura.REPUESTO_3,
        nuevaFactura.REPUESTO_4,
        nuevaFactura.REPUESTO_5,
        nuevaFactura.REPUESTO_6,
        nuevaFactura.REPUESTO_7,
        nuevaFactura.REPUESTO_8,
        nuevaFactura.REPUESTO_9,
        nuevaFactura.TOTAL,
        nuevaFactura.ID_TIENDA,
        nuevaFactura.ID_SOLICITUD,
      ],
      true
    );

    res.status(200).json({
      ok: true,
      registro_id: factura.lastRowid,
      registros_creados: factura.rowsAffected,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al crear factura',
      error,
    });
  }
};

// const editarFactura = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const body = req.body;
//     const mantenimEditado = {
//       id_mantenimiento: id,
//       nombre: body.nombre,
//       precio: body.precio,
//     };

//     const query = `UPDATE CLIENTES SET
//       NOMBRE = :NOMBRE,
//       PRECIO = :PRECIO,
//       WHERE ID_MANTENIMIENTO = :ID_MANTENIMIENTO`;
//     const mantenim = await db.realizarConsulta(
//       query,
//       [
//         mantenimEditado.nombre,
//         mantenimEditado.precio,
//         mantenimEditado.id_mantenimiento,
//       ],
//       true
//     );

//     res.status(200).json({
//       ok: true,
//       registro_id: mantenim.lastRowid,
//       registros_creados: mantenim.rowsAffected,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       ok: false,
//       message: 'Error al intentar editar mantenimiento',
//       error,
//     });
//   }
// };

// const eliminarFactura = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const mantenimEliminado = await db.realizarConsulta(
//       `DELETE FROM ${tabla} WHERE ID_MANTENIMIENTO = ${id}`,
//       [],
//       true
//     );

//     return res.status(200).json({
//       ok: true,
//       message: 'Mantenimiento eliminado correctamente',
//       registros_afectados: mantenimEliminado.rowsAffected,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       ok: false,
//       message: 'Error al intentar eliminar mantenimiento',
//       error,
//     });
//   }
// };

module.exports = {
  obtenerFacturas,
  crearFactura,
};
