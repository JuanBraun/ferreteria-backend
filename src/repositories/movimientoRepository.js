const db = require("../config/database");

class MovimientoRepository {
  async registrar(connection, { producto_id, tipo, cantidad, motivo }) {
    const [result] = await connection.query(
      `INSERT INTO movimientos_stock (producto_id, tipo, cantidad, motivo) 
            VALUES (?, ?, ?, ?)`,
      [producto_id, tipo, cantidad, motivo],
    );
    return { id: result.insertId, producto_id, tipo, cantidad, motivo };
  }

  async obtenerPorProductoId(producto_id) {
    const [rows] = await db.query(
      "SELECT * FROM movimientos_stock WHERE producto_id = ? ORDER BY fecha DESC",
      [producto_id],
    );
    return rows;
  }
}

module.exports = new MovimientoRepository();
