import productoRepository from '../repositories/ProductoRepository';
import AppError from '../utils/appError';

class InventarioService {

    async listarStock() {
        return await productoRepository.listarSinPaginar();
    }

    async listarStockBajo() {
        const productos = await productoRepository.listarSinPaginar();

        return productos.filter(
            producto => producto.stockActual <= producto.stockMinimo
        );
    }

    async consultarDisponibilidad(productoId: number) {
        const producto = await productoRepository.obtenerPorId(productoId);

        if (!producto) {
            throw new AppError('Producto no encontrado', 404);
        }

        return {
            productoId: producto.id,
            nombre: producto.nombre,
            stockDisponible: producto.stockActual,
            disponible: producto.stockActual > 0
        };
    }
}

export default new InventarioService();