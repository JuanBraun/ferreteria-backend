
import { Request, Response } from 'express';
import { Producto } from '../models/producto';
import productoService from '../services/productoService';
import AppError from '../utils/appError';

class ProductoController {

    private obtenerId(valor: string | string[]): number {
        if (typeof valor !== 'string') {
            throw new AppError('El ID debe ser un número entero positivo');
        }

        const id = Number(valor);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError('El ID debe ser un número entero positivo');
        }

        return id;
    }

    private obtenerNumeroQuery(
        valor: unknown,
        predeterminado: number,
        nombre: string
    ): number {
        if (valor === undefined) {
            return predeterminado;
        }

        if (typeof valor !== 'string' || valor.trim() === '') {
            throw new AppError(`El parámetro ${nombre} no es válido`);
        }

        const numero = Number(valor);

        if (!Number.isInteger(numero) || numero < 1) {
            throw new AppError(
                `${nombre} debe ser un entero mayor o igual a 1`
            );
        }

        return numero;
    }

    async listar(req: Request, res: Response): Promise<void> {
        const page = this.obtenerNumeroQuery(req.query.page, 1, 'page');
        const limit = this.obtenerNumeroQuery(req.query.limit, 10, 'limit');

        const sortBy = (
            req.query.sortBy === undefined ? 'id' : req.query.sortBy
        ) as keyof Producto;

        const order = (
            req.query.order === undefined ? 'asc' : req.query.order
        ) as 'asc' | 'desc';

        const opciones = {
            page,
            limit,
            sortBy,
            order,
            nombre: req.query.nombre as string | undefined,
            codigo: req.query.codigo as string | undefined,
            categoria: req.query.categoria as string | undefined
        };

        const resultado = await productoService.listar(opciones);

        res.status(200).json({
            mensaje: 'Productos obtenidos correctamente',
            datos: {
                productos: resultado.productos,
                total: resultado.total,
                pagina: page,
                limite: limit,
                totalPaginas: Math.ceil(resultado.total / limit)
            }
        });
    }

    async obtenerPorId(req: Request, res: Response): Promise<void> {
        const id = this.obtenerId(req.params.id);
        const producto = await productoService.obtenerPorId(id);

        if (!producto) {
            throw new AppError('Producto no encontrado', 404);
        }

        res.status(200).json({
            mensaje: 'Producto obtenido correctamente',
            datos: producto
        });
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

        const productoCreado = await productoService.crear(datosProducto);

        res.status(201).json({
            mensaje: 'Producto creado correctamente',
            datos: productoCreado
        });
    }

    async actualizar(req: Request, res: Response): Promise<void> {
        const id = this.obtenerId(req.params.id);

        const datosActualizados = {
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: Number(req.body.precio),
            stockActual: Number(req.body.stockActual),
            stockMinimo: Number(req.body.stockMinimo),
            categoria: req.body.categoria
        };

        const productoActualizado = await productoService.actualizar(
            id,
            datosActualizados
        );

        if (!productoActualizado) {
            throw new AppError('Producto no encontrado', 404);
        }

        res.status(200).json({
            mensaje: 'Producto actualizado correctamente',
            datos: productoActualizado
        });
    }

    async eliminar(req: Request, res: Response): Promise<void> {
        const id = this.obtenerId(req.params.id);
        const productoEliminado = await productoService.eliminar(id);

        if (!productoEliminado) {
            throw new AppError('Producto no encontrado', 404);
        }

        res.status(200).json({
            mensaje: 'Producto eliminado correctamente',
            datos: productoEliminado
        });
    }
}

export default new ProductoController();

