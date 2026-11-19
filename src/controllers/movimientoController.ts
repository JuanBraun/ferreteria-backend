
import { Request, Response, NextFunction } from 'express';
import movimientoService from '../services/movimientoService';
import AppError from '../utils/appError';
import { sendSuccess } from '../utils/apiResponse';

class MovimientoController {

    async listar(req: Request, res: Response, next: NextFunction) {
        try {
            const resultado = await movimientoService.listar(req.query);
            return sendSuccess(res, resultado, 'Ok', 200);
        } catch (error) {
            next(error);
        }
    }

    async obtenerPorId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) throw new AppError('ID de movimiento no válido', 400);

            const movimiento = await movimientoService.obtenerPorId(id);
            return sendSuccess(res, movimiento, 'Ok', 200);
        } catch (error) {
            next(error);
        }
    }


    async listarPorProducto(req: Request, res: Response, next: NextFunction) {
        try {
            const productoId = Number(req.params.productoId);

            if (!Number.isInteger(productoId) || productoId <= 0) {
                throw new AppError('ID de producto no válido');
            }

            const movimientos = await movimientoService.listarPorProducto(productoId);

            res.status(200).json({
                mensaje: 'Movimientos del producto obtenidos correctamente',
                datos: movimientos
            });
        } catch (error) {
            next(error);
        }
    }

    async crear(req: Request, res: Response, next: NextFunction) {
        try {
            const movimiento = await movimientoService.crear(req.body);
            return sendSuccess(res, movimiento, 'Movimiento registrado correctamente', 201);
        } catch (error) {
            next(error);
        }
    }

    async actualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) throw new AppError('ID de movimiento no válido', 400);

      const movimiento = await movimientoService.actualizar(id, req.body);
      return sendSuccess(res, movimiento, 'Movimiento actualizado correctamente', 200);
    } catch (error) {
      next(error);
    }
  }

  async eliminar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) throw new AppError('ID de movimiento no válido', 400);

      await movimientoService.eliminar(id);
      return sendSuccess(res, null, 'Movimiento eliminado correctamente', 200);
    } catch (error) {
      next(error);
    }
  }
}

export default new MovimientoController();
