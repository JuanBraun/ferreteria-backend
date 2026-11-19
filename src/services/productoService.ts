
import { Producto } from '../models/producto';
import productoRepository from '../repositories/ProductoRepository';
import AppError from '../utils/appError';

interface OpcionesListado {
    page: number;
    limit: number;
    sortBy: keyof Producto;
    order: 'asc' | 'desc';
    nombre?: string;
    codigo?: string;
    categoria?: string;
}

class ProductoService {

    async listar(opciones: OpcionesListado) {
        const {
            page,
            limit,
            sortBy,
            order,
            nombre,
            codigo,
            categoria
        } = opciones;

        if (!Number.isInteger(page) || page < 1) {
            throw new AppError('La página debe ser un entero mayor o igual a 1');
        }

        if (!Number.isInteger(limit) || limit < 1) {
            throw new AppError('El límite debe ser un entero mayor o igual a 1');
        }

        const camposOrdenables: (keyof Producto)[] = [
            'id',
            'codigo',
            'nombre',
            'precio',
            'stockActual',
            'stockMinimo',
            'categoria'
        ];

        if (!camposOrdenables.includes(sortBy)) {
            throw new AppError('Campo de ordenamiento no válido');
        }

        if (order !== 'asc' && order !== 'desc') {
            throw new AppError('El orden debe ser asc o desc');
        }

        return await productoRepository.listarConOpciones({
            page,
            limit,
            sortBy,
            order,
            nombre,
            codigo,
            categoria
        });
    }

    async obtenerPorId(id: number): Promise<Producto | undefined> {
        return await productoRepository.obtenerPorId(id);
    }

    async crear(datos: Omit<Producto, 'id'>): Promise<Producto> {
        this.validarDatos(datos);

        const productos = await productoRepository.obtenerTodos();

        const codigoExiste = productos.some(
            producto => producto.codigo === datos.codigo
        );

        if (codigoExiste) {
            throw new AppError('Ya existe un producto con ese código');
        }

        const nuevoProducto: Producto = {
            id: Date.now(),
            ...datos
        };

        return await productoRepository.crear(nuevoProducto);
    }

    async actualizar(
        id: number,
        datos: Omit<Producto, 'id'>
    ): Promise<Producto | undefined> {

        this.validarDatos(datos);

        const productoExistente = await productoRepository.obtenerPorId(id);

        if (!productoExistente) {
            return undefined;
        }

        const productos = await productoRepository.obtenerTodos();

        const codigoExiste = productos.some(
            producto => producto.codigo === datos.codigo && producto.id !== id
        );

        if (codigoExiste) {
            throw new AppError('Ya existe otro producto con ese código');
        }

        const productoActualizado: Producto = {
            id: id,
            ...datos
        };

        return await productoRepository.actualizar(
            id,
            productoActualizado
        );
    }

    async eliminar(id: number): Promise<Producto | undefined> {
        return await productoRepository.eliminar(id);
    }

    private validarDatos(datos: Omit<Producto, 'id'>): void {
        if (!datos.codigo?.trim()) {
            throw new AppError('El código es obligatorio');
        }

        if (!datos.nombre?.trim()) {
            throw new AppError('El nombre es obligatorio');
        }

        if (!datos.descripcion?.trim()) {
            throw new AppError('La descripción es obligatoria');
        }

        if (!datos.categoria?.trim()) {
            throw new AppError('La categoría es obligatoria');
        }

        if (!Number.isFinite(datos.precio) || datos.precio <= 0) {
            throw new AppError('El precio debe ser un número mayor que cero');
        }

        if (!Number.isInteger(datos.stockActual) || datos.stockActual < 0) {
            throw new AppError('El stock actual debe ser un entero mayor o igual a cero');
        }

        if (!Number.isInteger(datos.stockMinimo) || datos.stockMinimo < 0) {
            throw new AppError('El stock mínimo debe ser un entero mayor o igual a cero');
        }
    }
}

export default new ProductoService();
