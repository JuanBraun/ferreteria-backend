const ubicacionService = require("../services/ubicacionService");

class UbicacionController {
  async getUbicaciones(req, res, next) {
    try {
      const ubicaciones = await ubicacionService.listarUbicaciones();
      res.status(200).json(ubicaciones);
    } catch (error) {
      next(error);
    }
  }

  async createUbicacion(req, res, next) {
    try {
      const nuevaUbicacion = await ubicacionService.crearUbicacion(req.body);
      res.status(201).json(nuevaUbicacion);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UbicacionController();
