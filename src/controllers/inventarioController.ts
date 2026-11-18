import { Request, Response } from 'express';
import inventarioService from '../services/inventarioService';
import AppError from '../utils/appError';

class InventarioController {

    async listarStock(req: Request, res: Response): Promise<void> {
        const productos = await inventarioService.listarStock();

        res.status(200).json({
            mensaje: 'Inventario obtenido correctamente',
            datos: productos
        });
    }

    async listarStockBajo(req: Request, res: Response): Promise<void> {
        const productos = await inventarioService.listarStockBajo();

        res.status(200).json({
            mensaje: 'Productos con stock bajo obtenidos correctamente',
            datos: productos
        });
    }

    async consultarDisponibilidad(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError('El ID debe ser un número entero positivo');
        }

        const disponibilidad = await inventarioService.consultarDisponibilidad(id);

        res.status(200).json({
            mensaje: 'Disponibilidad consultada correctamente',
            datos: disponibilidad
        });
    }
}

export default new InventarioController();