const categoriaService = require("../services/categoriaService");

class CategoriaController {
  async getCategorias(req, res, next) {
    try {
      const categorias = await categoriaService.listarCategorias();
      res.status(200).json(categorias);
    } catch (error) {
      next(error);
    }
  }

  async createCategoria(req, res, next) {
    try {
      const nuevaCategoria = await categoriaService.crearCategoria(req.body);
      res.status(201).json(nuevaCategoria);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoriaController();
