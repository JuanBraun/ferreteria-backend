const db = require("../config/database");

class CategoriaRepository {
  async obtenerTodas() {
    const [rows] = await db.query("SELECT * FROM categorias");
    return rows;
  }

  async crear({ nombre, descripcion }) {
    const [result] = await db.query(
      "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)",
      [nombre, descripcion],
    );
    return { id: result.insertId, nombre, descripcion };
  }
}

module.exports = new CategoriaRepository();
