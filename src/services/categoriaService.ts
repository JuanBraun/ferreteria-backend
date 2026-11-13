import { Categoria } from '../models/categoria';
import categoriaRepository from '../repositories/CategoriaRepository';
import AppError from '../utils/appError';

class CategoriaService {

    async listar(): Promise<Categoria[]> {
        return await categoriaRepository.obtenerTodos();
    }

    async obtenerPorId(id: number): Promise<Categoria | undefined> {
        return await categoriaRepository.obtenerPorId(id);
    }

    async crear(datos: Omit<Categoria, 'id'>): Promise<Categoria> {
        this.validarDatos(datos);

        const categorias = await categoriaRepository.obtenerTodos();

        const nombreExiste = categorias.some(
            categoria => categoria.nombre.toLowerCase() === datos.nombre.trim().toLowerCase()
        );

        if (nombreExiste) {
            throw new AppError('Ya existe una categoría con ese nombre');
        }

        const nuevaCategoria: Categoria = {
            id: Date.now(),
            nombre: datos.nombre.trim(),
            descripcion: datos.descripcion?.trim()
        };

        return await categoriaRepository.crear(nuevaCategoria);
    }

    async actualizar(
        id: number,
        datos: Omit<Categoria, 'id'>
    ): Promise<Categoria | undefined> {
        this.validarDatos(datos);

        const categoriaExistente = await categoriaRepository.obtenerPorId(id);

        if (!categoriaExistente) {
            return undefined;
        }

        const categorias = await categoriaRepository.obtenerTodos();

        const nombreExiste = categorias.some(
            categoria =>
                categoria.nombre.toLowerCase() === datos.nombre.trim().toLowerCase()
                && categoria.id !== id
        );

        if (nombreExiste) {
            throw new AppError('Ya existe otra categoría con ese nombre');
        }

        const categoriaActualizada: Categoria = {
            id,
            nombre: datos.nombre.trim(),
            descripcion: datos.descripcion?.trim()
        };

        return await categoriaRepository.actualizar(id, categoriaActualizada);
    }

    async eliminar(id: number): Promise<Categoria | undefined> {
        return await categoriaRepository.eliminar(id);
    }

    private validarDatos(datos: Omit<Categoria, 'id'>): void {
        if (!datos.nombre?.trim()) {
            throw new AppError('El nombre de la categoría es obligatorio');
        }

        if (
            datos.descripcion !== undefined &&
            typeof datos.descripcion !== 'string'
        ) {
            throw new AppError('La descripción debe ser un texto');
        }
    }
}

export default new CategoriaService();