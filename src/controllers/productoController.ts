import { Request, Response } from 'express';
import { Producto } from '../models/producto';
import productoService from '../services/productoService';

class ProductoController {
    async listar(req: Request, res: Response): Promise<void> {
        try {
            const opciones = {
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 10,
                sortBy: (req.query.sortBy || 'id') as keyof Producto,
                order: (req.query.order || 'asc') as 'asc' | 'desc',
                nombre: req.query.nombre as string | undefined,
                codigo: req.query.codigo as string | undefined,
                categoria: req.query.categoria as string | undefined
            };

            const resultado = await productoService.listar(opciones);

            res.json({
                productos: resultado.productos,
                total: resultado.total,
                pagina: opciones.page,
                limite: opciones.limit,
                totalPaginas: Math.ceil(resultado.total / opciones.limit)
            });
        } catch (error) {
            res.status(400).json({
                mensaje: error instanceof Error
                    ? error.message
                    : 'Error al listar los productos'
            });
        }
    }

    async obtenerPorId(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                mensaje: 'El ID debe ser un número entero positivo'
            });
            return;
        }

        const producto = await productoService.obtenerPorId(id);

        if (!producto) {
            res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
            return;
        }

        res.json(producto);
    }

    async crear(req: Request, res: Response): Promise<void> {
        const datosProducto = {
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: Number(req.body.precio),
            stockActual: Number(req.body.stockActual),
            stockMinimo: Number(req.body.stockMinimo),
            categoria: req.body.categoria
        };

        try {
            const productoCreado = await productoService.crear(datosProducto);

            res.status(201).json({
                mensaje: 'Producto creado correctamente',
                producto: productoCreado
            });
        } catch (error) {
            res.status(400).json({
                mensaje: error instanceof Error
                    ? error.message
                    : 'Error al crear el producto'
            });
        }
    }

    async actualizar(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                mensaje: 'El ID debe ser un número entero positivo'
            });
            return;
        }

        const datosActualizados = {
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: Number(req.body.precio),
            stockActual: Number(req.body.stockActual),
            stockMinimo: Number(req.body.stockMinimo),
            categoria: req.body.categoria
        };

        try {
            const productoActualizado = await productoService.actualizar(
                id,
                datosActualizados
            );

            if (!productoActualizado) {
                res.status(404).json({
                    mensaje: 'Producto no encontrado'
                });
                return;
            }

            res.json({
                mensaje: 'Producto actualizado correctamente',
                producto: productoActualizado
            });
        } catch (error) {
            res.status(400).json({
                mensaje: error instanceof Error
                    ? error.message
                    : 'Error al actualizar el producto'
            });
        }
    }

    async eliminar(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                mensaje: 'El ID debe ser un número entero positivo'
            });
            return;
        }

        const productoEliminado = await productoService.eliminar(id);

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