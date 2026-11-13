import { Request, Response } from 'express';
import categoriaService from '../services/categoriaService';
import AppError from '../utils/appError';

class CategoriaController {

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

    async listar(req: Request, res: Response): Promise<void> {
        const categorias = await categoriaService.listar();

        res.status(200).json({
            mensaje: 'Categorías obtenidas correctamente',
            datos: categorias
        });
    }

    async obtenerPorId(req: Request, res: Response): Promise<void> {
        const id = this.obtenerId(req.params.id);
        const categoria = await categoriaService.obtenerPorId(id);

        if (!categoria) {
            throw new AppError('Categoría no encontrada', 404);
        }

        res.status(200).json({
            mensaje: 'Categoría obtenida correctamente',
            datos: categoria
        });
    }

    async crear(req: Request, res: Response): Promise<void> {
        const datosCategoria = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        };

        const categoriaCreada = await categoriaService.crear(datosCategoria);

        res.status(201).json({
            mensaje: 'Categoría creada correctamente',
            datos: categoriaCreada
        });
    }

    async actualizar(req: Request, res: Response): Promise<void> {
        const id = this.obtenerId(req.params.id);

        const datosActualizados = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        };

        const categoriaActualizada = await categoriaService.actualizar(
            id,
            datosActualizados
        );

        if (!categoriaActualizada) {
            throw new AppError('Categoría no encontrada', 404);
        }

        res.status(200).json({
            mensaje: 'Categoría actualizada correctamente',
            datos: categoriaActualizada
        });
    }

    async eliminar(req: Request, res: Response): Promise<void> {
        const id = this.obtenerId(req.params.id);
        const categoriaEliminada = await categoriaService.eliminar(id);

        if (!categoriaEliminada) {
            throw new AppError('Categoría no encontrada', 404);
        }

        res.status(200).json({
            mensaje: 'Categoría eliminada correctamente',
            datos: categoriaEliminada
        });
    }
}

export default new CategoriaController();