import { Request, Response, NextFunction } from 'express';
import proveedorService from '../services/proveedorService';
import AppError from '../utils/appError';
import { sendSuccess } from '../utils/apiResponse';

class ProveedorController {

    async listar(req: Request, res: Response, next: NextFunction) {
        try {
            const resultado = await proveedorService.listar(req.query);
            return sendSuccess(res, resultado, 'Ok', 200);
        } catch (error) {
            next(error);
        }
    }

    async obtenerPorId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                throw new AppError('ID de proveedor no válido', 400);
            }

            const proveedor = await proveedorService.obtenerPorId(id);
            return sendSuccess(res, proveedor, 'Ok', 200);
        } catch (error) {
            next(error);
        }
    }

    async crear(req: Request, res: Response, next: NextFunction) {
        try {
            const proveedor = await proveedorService.crear(req.body);
            return sendSuccess(res, proveedor, 'Proveedor creado correctamente', 201);
        } catch (error) {
            next(error);
        }
    }

    async actualizar(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                throw new AppError('ID de proveedor no válido', 400);
            }

            const proveedor = await proveedorService.actualizar(id, req.body);
            return sendSuccess(res, proveedor, 'Proveedor actualizado correctamente', 200);
        } catch (error) {
            next(error);
        }
    }

    async eliminar(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                throw new AppError('ID de proveedor no válido', 400);
            }

            await proveedorService.eliminar(id);
            return sendSuccess(res, null, 'Proveedor eliminado correctamente', 200);
        } catch (error) {
            next(error);
        }
    }
}

export default new ProveedorController();