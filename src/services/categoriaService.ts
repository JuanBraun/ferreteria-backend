import { Categoria } from '../models/categoria';
import categoriaRepository from '../repositories/CategoriaRepository';
import AppError from '../utils/appError';
import { QueryOptions } from '../utils/pagination';


class CategoriaService {
    async listar(query: QueryOptions) {
        return await categoriaRepository.obtenerTodos(query);
    }

    async obtenerPorId(id: number): Promise<Categoria> {
        const categoria = await categoriaRepository.obtenerPorId(id);
            if (!categoria) throw new AppError('Categoría no encontrada', 404);
        return categoria;
    }

    async crear(datos: Omit<Categoria, 'id'>): Promise<Categoria> {
        if (!datos.nombre?.trim()) {
            throw new AppError('El nombre de la categoría es obligatorio', 400);
        }

        const todas = await categoriaRepository.listarSinPaginar();
        const nombreExiste = todas.some(
            (c) => c.nombre.toLowerCase() === datos.nombre.trim().toLowerCase()
            );
        if (nombreExiste) {
            throw new AppError('Ya existe una categoría con ese nombre', 400);
        }

    return await categoriaRepository.crear({
        nombre: datos.nombre.trim(),
        descripcion: datos.descripcion?.trim() || '',
    });
    }

    async actualizar(id: number, datos: Partial<Omit<Categoria, 'id'>>): Promise<Categoria> {
        await this.obtenerPorId(id);

        if (datos.nombre !== undefined) {
            if (!datos.nombre.trim()) {
                throw new AppError('El nombre de la categoría no puede estar vacío', 400);
        }
        const todas = await categoriaRepository.listarSinPaginar();
        const nombreExiste = todas.some(
            (c) => c.nombre.toLowerCase() === datos.nombre!.trim().toLowerCase() && c.id !== id
        );
        if (nombreExiste) {
            throw new AppError('Ya existe otra categoría con ese nombre', 400);
        }
    }

    const actualizada = await categoriaRepository.actualizar(id, {
        ...(datos.nombre !== undefined ? { nombre: datos.nombre.trim() } : {}),
        ...(datos.descripcion !== undefined ? { descripcion: datos.descripcion.trim() } : {}),
    });

    if (!actualizada) throw new AppError('Categoría no encontrada', 404);
    return actualizada;
    }

    async eliminar(id: number): Promise<Categoria> {
    const eliminada = await categoriaRepository.eliminar(id);
    if (!eliminada) throw new AppError('Categoría no encontrada', 404);
    return eliminada;
    }
}

export default new CategoriaService();