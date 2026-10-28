
import { Request, Response } from 'express';
import productoRepository from '../repositories/ProductoRepository';

class ProductoController {
    async listar(req: Request, res: Response): Promise<void> {
        const productos = await productoRepository.obtenerTodos();
        res.json(productos);
    }

    async obtenerPorId(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                mensaje: 'El ID debe ser un número entero positivo'
            });
            return;
        }

        const producto = await productoRepository.obtenerPorId(id);

        if (!producto) {
            res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
            return;
        }

        res.json(producto);
    }
}

export default new ProductoController();
