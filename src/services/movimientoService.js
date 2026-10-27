const db = require("../config/database");
const movimientoRepository = require("../repositorios/movimientoRepository");
const productoService = require("./productoService");

class MovimientoService {
  async registrarMovimiento({ producto_id, tipo, cantidad, motivo }) {
    const cant = Number(cantidad);
    if (isNaN(cant) || cant <= 0) {
      const error = new Error("La cantidad debe ser un número mayor a cero");
      error.status = 400;
      throw error;
    }

    // Obtener el producto actual (lanza 404 si no existe)
    const producto = await productoService.obtenerProducto(producto_id);

    let nuevoStock = Number(producto.stock_actual);

    if (tipo === "INGRESO") {
      nuevoStock += cant;
    } else if (tipo === "EGRESO") {
      if (nuevoStock - cant < 0) {
        const error = new Error(
          `Stock insuficiente. Stock actual: ${nuevoStock}`,
        );
        error.status = 400;
        throw error;
      }
      nuevoStock -= cant;
    } else {
      const error = new Error(
        "El tipo de movimiento debe ser 'INGRESO' o 'EGRESO'",
      );
      error.status = 400;
      throw error;
    }

    // Iniciar transacción SQL
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // 1. Registrar movimiento
      const movimiento = await movimientoRepository.registrar(connection, {
        producto_id,
        tipo,
        cantidad: cant,
        motivo,
      });

      // 2. Actualizar stock del producto
      await connection.query(
        "UPDATE productos SET stock_actual = ? WHERE id = ?",
        [nuevoStock, producto_id],
      );

      await connection.commit();

      // 3. Notificar a observadores si corresponde (Observer Pattern)
      const productoActualizado = { ...producto, stock_actual: nuevoStock };
      productoService.notificarObservers(productoActualizado);

      return { movimiento, nuevo_stock: nuevoStock };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async obtenerHistorial(producto_id) {
    await productoService.obtenerProducto(producto_id);
    return await movimientoRepository.obtenerPorProductoId(producto_id);
  }
}

module.exports = new MovimientoService();
