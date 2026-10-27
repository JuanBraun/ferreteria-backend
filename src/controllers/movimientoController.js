const movimientoService = require("../services/movimientoService");

class MovimientoController {
  async registrar(req, res, next) {
    try {
      const resultado = await movimientoService.registrarMovimiento(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      next(error);
    }
  }

  async obtenerHistorial(req, res, next) {
    try {
      const historial = await movimientoService.obtenerHistorial(
        req.params.productoId,
      );
      res.status(200).json(historial);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MovimientoController();
