
import { Request, Response, NextFunction } from 'express';
import movimientoService from '../services/movimientoService';
import AppError from '../utils/appError';

class MovimientoController {

    async listar(req: Request, res: Response, next: NextFunction) {
        try {
            const movimientos = await movimientoService.listar();

            res.status(200).json({
                mensaje: 'Movimientos obtenidos correctamente',
                datos: movimientos
            });
        } catch (error) {
            next(error);
        }
    }

    async obtenerPorId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                throw new AppError('ID de movimiento no válido');
            }

            const movimiento = await movimientoService.obtenerPorId(id);

            res.status(200).json({
                mensaje: 'Movimiento obtenido correctamente',
                datos: movimiento
            });
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

            res.status(201).json({
                mensaje: 'Movimiento registrado correctamente',
                datos: movimiento
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new MovimientoController();
