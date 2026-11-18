
import { Movimiento } from '../models/movimiento';
import movimientoRepository from '../repositories/MovimientoRepository';
import productoRepository from '../repositories/ProductoRepository';
import AppError from '../utils/appError';

class MovimientoService {

    async listar() {
        return await movimientoRepository.obtenerTodos();
    }

    async obtenerPorId(id: number) {
        const movimiento = await movimientoRepository.obtenerPorId(id);

        if (!movimiento) {
            throw new AppError('Movimiento no encontrado', 404);
        }

        return movimiento;
    }

    async listarPorProducto(productoId: number) {
        const producto = await productoRepository.obtenerPorId(productoId);

        if (!producto) {
            throw new AppError('Producto no encontrado', 404);
        }

        return await movimientoRepository.obtenerPorProducto(productoId);
    }

    async crear(datos: Omit<Movimiento, 'id' | 'fecha'>) {
        const { productoId, tipo, cantidad, observacion } = datos;

        if (!Number.isInteger(productoId) || productoId <= 0) {
            throw new AppError('El ID del producto debe ser un entero positivo');
        }

        if (tipo !== 'entrada' && tipo !== 'salida') {
            throw new AppError('El tipo de movimiento debe ser entrada o salida');
        }

        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            throw new AppError('La cantidad debe ser un entero mayor que cero');
        }

        if (observacion !== undefined && typeof observacion !== 'string') {
            throw new AppError('La observación debe ser un texto');
        }

        const producto = await productoRepository.obtenerPorId(productoId);

        if (!producto) {
            throw new AppError('Producto no encontrado', 404);
        }

        let nuevoStock = producto.stockActual;

        if (tipo === 'entrada') {
            nuevoStock += cantidad;
        } else {
            if (cantidad > producto.stockActual) {
                throw new AppError('No hay stock suficiente para realizar la salida');
            }

            nuevoStock -= cantidad;
        }

        const productoActualizado = await productoRepository.actualizar(
            productoId,
            {
                ...producto,
                stockActual: nuevoStock
            }
        );

        if (!productoActualizado) {
            throw new AppError('No se pudo actualizar el stock', 500);
        }

        const nuevoMovimiento: Movimiento = {
            id: Date.now(),
            productoId,
            tipo,
            cantidad,
            fecha: new Date(),
            observacion: observacion?.trim() || undefined
        };

        return await movimientoRepository.crear(nuevoMovimiento);
    }
}

export default new MovimientoService();
