const productoService = require("../services/productoService");

class ProductoController {
  async getProductos(req, res, next) {
    try {
      const productos = await productoService.listarProductos();
      res.status(200).json(productos);
    } catch (error) {
      next(error);
    }
  }

  async getProductoById(req, res, next) {
    try {
      const producto = await productoService.obtenerProducto(req.params.id);
      res.status(200).json(producto);
    } catch (error) {
      next(error);
    }
  }

  async createProducto(req, res, next) {
    try {
      const nuevoProducto = await productoService.crearProducto(req.body);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      next(error);
    }
  }

  async updateProducto(req, res, next) {
    try {
      const productoActualizado = await productoService.actualizarProducto(
        req.params.id,
        req.body,
      );
      res.status(200).json(productoActualizado);
    } catch (error) {
      next(error);
    }
  }

  async deleteProducto(req, res, next) {
    try {
      await productoService.eliminarProducto(req.params.id);
      res.status(200).json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductoController();
