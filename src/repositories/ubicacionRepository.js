const db = require("../config/database");

class UbicacionRepository {
  async obtenerTodas() {
    const [rows] = await db.query("SELECT * FROM ubicaciones");
    return rows;
  }

  async crear({ pasillo, estante, nivel, descripcion }) {
    const [result] = await db.query(
      "INSERT INTO ubicaciones (pasillo, estante, nivel, descripcion) VALUES (?, ?, ?, ?)",
      [pasillo, estante, nivel, descripcion],
    );
    return { id: result.insertId, pasillo, estante, nivel, descripcion };
  }
}

module.exports = new UbicacionRepository();
