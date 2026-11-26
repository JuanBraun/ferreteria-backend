import { Producto } from '../models/producto';
import productoRepository, { ProductoQueryOptions } from '../repositories/ProductoRepository';
import AppError from '../utils/appError';

class ProductoService {
    async listar(query: ProductoQueryOptions) {
        return await productoRepository.obtenerTodos(query);
    }

    async obtenerPorId(id: number): Promise<Producto> {
        const producto = await productoRepository.obtenerPorId(id);
        if (!producto) throw new AppError('Producto no encontrado', 404);
        return producto;
    }

    async crear(datos: Omit<Producto, 'id'>): Promise<Producto> {
        this.validarDatosCompletos(datos);

        const todos = await productoRepository.listarSinPaginar();
        const codigoExiste = todos.some(
            (p) => p.codigo.toLowerCase() === datos.codigo.trim().toLowerCase()
        );
        if (codigoExiste) {
            throw new AppError('Ya existe un producto con ese código', 400);
        }

        return await productoRepository.crear({
            codigo: datos.codigo.trim().toUpperCase(),
            nombre: datos.nombre.trim(),
            descripcion: datos.descripcion?.trim() || '',
            precio: Number(datos.precio),
            stockActual: Number(datos.stockActual),
            stockMinimo: Number(datos.stockMinimo),
            categoria: datos.categoria.trim(),
        });
    }

    async actualizar(id: number, datos: Partial<Omit<Producto, 'id'>>): Promise<Producto> {
        await this.obtenerPorId(id);

        if (datos.codigo !== undefined) {
            if (!datos.codigo.trim()) throw new AppError('El código no puede estar vacío', 400);
            const todos = await productoRepository.listarSinPaginar();
            const codigoExiste = todos.some(
            (p) => p.codigo.toLowerCase() === datos.codigo!.trim().toLowerCase() && p.id !== id
        );
        if (codigoExiste) {
        throw new AppError('Ya existe otro producto con ese código', 400);
        }
    }

    if (datos.precio !== undefined && (!Number.isFinite(Number(datos.precio)) || Number(datos.precio) <= 0)) {
        throw new AppError('El precio debe ser un número mayor que cero', 400);
    }

    if (datos.stockActual !== undefined && (!Number.isInteger(Number(datos.stockActual)) || Number(datos.stockActual) < 0)) {
        throw new AppError('El stock actual debe ser un entero mayor o igual a cero', 400);
    }

    if (datos.stockMinimo !== undefined && (!Number.isInteger(Number(datos.stockMinimo)) || Number(datos.stockMinimo) < 0)) {
        throw new AppError('El stock mínimo debe ser un entero mayor o igual a cero', 400);
    }

    const limpio: Partial<Producto> = {};
    if (datos.codigo !== undefined) limpio.codigo = datos.codigo.trim().toUpperCase();
    if (datos.nombre !== undefined) limpio.nombre = datos.nombre.trim();
    if (datos.descripcion !== undefined) limpio.descripcion = datos.descripcion.trim();
    if (datos.precio !== undefined) limpio.precio = Number(datos.precio);
    if (datos.stockActual !== undefined) limpio.stockActual = Number(datos.stockActual);
    if (datos.stockMinimo !== undefined) limpio.stockMinimo = Number(datos.stockMinimo);
    if (datos.categoria !== undefined) limpio.categoria = datos.categoria.trim();

    const actualizado = await productoRepository.actualizar(id, limpio);
    if (!actualizado) throw new AppError('Producto no encontrado', 404);
    return actualizado;
    }

    async eliminar(id: number): Promise<Producto> {
        const eliminado = await productoRepository.eliminar(id);
        if (!eliminado) throw new AppError('Producto no encontrado', 404);
            return eliminado;
        }

        private validarDatosCompletos(datos: Omit<Producto, 'id'>): void {
        if (!datos.codigo?.trim()) throw new AppError('El código es obligatorio', 400);
        if (!datos.nombre?.trim()) throw new AppError('El nombre es obligatorio', 400);
        if (!datos.categoria?.trim()) throw new AppError('La categoría es obligatoria', 400);
        if (!Number.isFinite(Number(datos.precio)) || Number(datos.precio) <= 0) {
            throw new AppError('El precio debe ser un número mayor que cero', 400);
        }
        if (!Number.isInteger(Number(datos.stockActual)) || Number(datos.stockActual) < 0) {
            throw new AppError('El stock actual debe ser un entero mayor o igual a cero', 400);
        }
        if (!Number.isInteger(Number(datos.stockMinimo)) || Number(datos.stockMinimo) < 0) {
            throw new AppError('El stock mínimo debe ser un entero mayor o igual a cero', 400);
        }
    }
}

export default new ProductoService();
