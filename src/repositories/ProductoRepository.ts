
import { Producto } from '../models/producto';

class ProductoRepository {
    private productos: Producto[] = [
        {
            id: 1,
            codigo: 'TOR-001',
            nombre: 'Tornillo Phillips',
            descripcion: 'Tornillo para madera',
            precio: 150,
            stockActual: 100,
            stockMinimo: 20,
            categoria: 'Tornillería'
        },
        {
            id: 2,
            codigo: 'MAR-001',
            nombre: 'Martillo',
            descripcion: 'Martillo de acero con mango',
            precio: 8500,
            stockActual: 8,
            stockMinimo: 10,
            categoria: 'Herramientas'
        }
    ];

    async obtenerTodos(): Promise<Producto[]> {
        return this.productos;
    }

    async obtenerPorId(id: number): Promise<Producto | undefined> {
        return this.productos.find(producto => producto.id === id);
    }

    async crear(producto: Producto): Promise<Producto> {
        this.productos.push(producto);
        return producto;
    }

    async actualizar(id: number, datosActualizados: Producto): Promise<Producto | undefined> {
    const indice = this.productos.findIndex(producto => producto.id === id);

    if (indice === -1) {
        return undefined;
    }

    this.productos[indice] = {
        ...this.productos[indice],
        ...datosActualizados,
        id: id
    };

    return this.productos[indice];
 }

 async eliminar(id: number): Promise<Producto | undefined> {
    const indice = this.productos.findIndex(producto => producto.id === id);

    if (indice === -1) {
        return undefined;
    }

    const [productoEliminado] = this.productos.splice(indice, 1);

    return productoEliminado;
 }

}

export default new ProductoRepository();

