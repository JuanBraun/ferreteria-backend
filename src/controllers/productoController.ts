import { Request, Response, NextFunction } from 'express';
import productoService from '../services/productoService';
import AppError from '../utils/appError';
import { sendSuccess } from '../utils/apiResponse';

class ProductoController {
    private obtenerId(valor: string | string[]): number {
        if (typeof valor !== 'string') throw new AppError('ID de producto no válido', 400);
        const id = Number(valor);
        if (!Number.isInteger(id) || id <= 0) throw new AppError('ID de producto no válido', 400);
        return id;
    }

    async listar(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const resultado = await productoService.listar(req.query);
            sendSuccess(res, resultado, 'Ok', 200);
        } catch (error) {
            next(error);
        }
    }

    async obtenerPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = this.obtenerId(req.params.id);
            const producto = await productoService.obtenerPorId(id);
            sendSuccess(res, producto, 'Ok', 200);
        } catch (error) {
            next(error);
        }
    }

    async crear(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productoCreado = await productoService.crear(req.body);
            sendSuccess(res, productoCreado, 'Producto creado correctamente', 201);
        } catch (error) {
            next(error);
        }
    }

    async actualizar(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = this.obtenerId(req.params.id);
            const productoActualizado = await productoService.actualizar(id, req.body);
            sendSuccess(res, productoActualizado, 'Producto actualizado correctamente', 200);
        } catch (error) {
            next(error);
        }
    }

    async eliminar(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = this.obtenerId(req.params.id);
            const productoEliminado = await productoService.eliminar(id);
            sendSuccess(res, productoEliminado, 'Producto eliminado correctamente', 200);
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductoController();

