import { Request, Response, NextFunction } from 'express';
import categoriaService from '../services/categoriaService';
import AppError from '../utils/appError';
import { sendSuccess } from '../utils/apiResponse';

class CategoriaController {
    private obtenerId(valor: string | string[]): number {
    if (typeof valor !== 'string') throw new AppError('ID de categoría no válido', 400);
    const id = Number(valor);
    if (!Number.isInteger(id) || id <= 0) throw new AppError('ID de categoría no válido', 400);
    return id;
    }

    async listar(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const resultado = await categoriaService.listar(req.query);
            sendSuccess(res, resultado, 'Ok', 200);
        } catch (error) {
            next(error);
        }
    }

    async obtenerPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = this.obtenerId(req.params.id);
            const categoria = await categoriaService.obtenerPorId(id);
            sendSuccess(res, categoria, 'Ok', 200);
        } catch (error) {
            next(error);
        }
    }

    async crear(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoriaCreada = await categoriaService.crear(req.body);
            sendSuccess(res, categoriaCreada, 'Categoría creada correctamente', 201);
        } catch (error) {
            next(error);
        }
    }

    async actualizar(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = this.obtenerId(req.params.id);
            const categoriaActualizada = await categoriaService.actualizar(id, req.body);
            sendSuccess(res, categoriaActualizada, 'Categoría actualizada correctamente', 200);
        } catch (error) {
            next(error);
        }
    }

    async eliminar(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = this.obtenerId(req.params.id);
            const categoriaEliminada = await categoriaService.eliminar(id);
            sendSuccess(res, categoriaEliminada, 'Categoría eliminada correctamente', 200);
        } catch (error) {
            next(error);
        }
    }
}

export default new CategoriaController();