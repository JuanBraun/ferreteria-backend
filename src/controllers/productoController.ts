
import { Request, Response } from 'express';
import productoRepository from '../repositories/ProductoRepository';
import { Producto } from '../models/producto';

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

    async crear(req: Request, res: Response): Promise<void> {
    const nuevoProducto: Producto = {
        id: Date.now(),
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: Number(req.body.precio),
        stockActual: Number(req.body.stockActual),
        stockMinimo: Number(req.body.stockMinimo),
        categoria: req.body.categoria
    };

    const productoCreado = await productoRepository.crear(nuevoProducto);

    res.status(201).json({
        mensaje: 'Producto creado correctamente',
        producto: productoCreado
    });
 }

 async actualizar(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
            mensaje: 'El ID debe ser un número entero positivo'
        });
        return;
    }

    const productoExistente = await productoRepository.obtenerPorId(id);

    if (!productoExistente) {
        res.status(404).json({
            mensaje: 'Producto no encontrado'
        });
        return;
    }

    const datosActualizados: Producto = {
        id: id,
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: Number(req.body.precio),
        stockActual: Number(req.body.stockActual),
        stockMinimo: Number(req.body.stockMinimo),
        categoria: req.body.categoria
    };

    const productoActualizado = await productoRepository.actualizar(id, datosActualizados);

    res.json({
        mensaje: 'Producto actualizado correctamente',
        producto: productoActualizado
    });
 }

 async eliminar(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
            mensaje: 'El ID debe ser un número entero positivo'
        });
        return;
    }

    const productoEliminado = await productoRepository.eliminar(id);

    if (!productoEliminado) {
        res.status(404).json({
            mensaje: 'Producto no encontrado'
        });
        return;
    }

    res.json({
        mensaje: 'Producto eliminado correctamente',
        producto: productoEliminado
    });
 }

}

export default new ProductoController();
