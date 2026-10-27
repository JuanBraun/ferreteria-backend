
import { Producto } from '../models/Producto';

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
}

export default new ProductoRepository();
