const categoriaRepository = require("../repositorios/categoriaRepository");

class CategoriaService {
  async listarCategorias() {
    return await categoriaRepository.obtenerTodas();
  }

  async crearCategoria(datos) {
    if (!datos.nombre || datos.nombre.trim() === "") {
      const error = new Error("El nombre de la categoría es obligatorio");
      error.status = 400;
      throw error;
    }
    return await categoriaRepository.crear(datos);
  }
}

module.exports = new CategoriaService();
