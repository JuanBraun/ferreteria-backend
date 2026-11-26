import { Producto } from '../models/producto';
import { paginateAndFilter, QueryOptions, PaginatedResult } from '../utils/pagination';

export interface ProductoQueryOptions extends QueryOptions {
    categoria?: string;
    bajoStock?: string;
}

class ProductoRepository {
    private productos: Producto[] = [
        { id: 1, codigo: 'TOR-001', nombre: 'Tornillo Phillips 1"', descripcion: 'Tornillo autoperforante para madera (caja x 100u)', precio: 1500, stockActual: 100, stockMinimo: 20, categoria: 'Tornillería' },
        { id: 2, codigo: 'MAR-001', nombre: 'Martillo Galponero', descripcion: 'Martillo de acero forjado con mango de fibra', precio: 8500, stockActual: 8, stockMinimo: 10, categoria: 'Herramientas Manuales' },
        { id: 3, codigo: 'PIN-001', nombre: 'Pintura Látex Interior 4L', descripcion: 'Látex blanco mate lavable', precio: 18500, stockActual: 24, stockMinimo: 6, categoria: 'Pinturería' },
        { id: 4, codigo: 'TAL-001', nombre: 'Taladro Percutor 650W', descripcion: 'Taladro eléctrico velocidad variable 13mm', precio: 64000, stockActual: 5, stockMinimo: 3, categoria: 'Herramientas Eléctricas' },
        { id: 5, codigo: 'CIN-001', nombre: 'Cinta Métrica 5m', descripcion: 'Cinta métrica metálica con freno y clip', precio: 4200, stockActual: 30, stockMinimo: 10, categoria: 'Medición y Nivelación' },
        { id: 6, codigo: 'LLA-001', nombre: 'Llave Francesa 10"', descripcion: 'Llave ajustable de acero cromo vanadio', precio: 11200, stockActual: 4, stockMinimo: 8, categoria: 'Herramientas Manuales' },
        { id: 7, codigo: 'CAB-001', nombre: 'Cable Unipolar 2.5mm (100m)', descripcion: 'Cable eléctrico normalizado color celeste', precio: 45000, stockActual: 12, stockMinimo: 4, categoria: 'Electricidad' },
        { id: 8, codigo: 'ADH-001', nombre: 'Adhesivo de Contacto 250ml', descripcion: 'Pegamento multiuso de secado rápido', precio: 3800, stockActual: 18, stockMinimo: 5, categoria: 'Adhesivos y Selladores' },
        { id: 9, codigo: 'AMO-001', nombre: 'Amoladora Angular 115mm 820W', descripcion: 'Amoladora compacta con guarda protectora', precio: 52000, stockActual: 2, stockMinimo: 4, categoria: 'Herramientas Eléctricas' },
        { id: 10, codigo: 'DIS-001', nombre: 'Disco Corte Metal 115mm', descripcion: 'Disco abrasivo fino para hierro y acero inoxidable', precio: 1200, stockActual: 65, stockMinimo: 25, categoria: 'Abrasivos y Corte' },
        { id: 11, codigo: 'PLO-001', nombre: 'Llave de Paso Esférica 1/2"', descripcion: 'Válvula de bronce cromado paso total', precio: 6900, stockActual: 15, stockMinimo: 6, categoria: 'Plomería' },
        { id: 12, codigo: 'CER-001', nombre: 'Cerradura Seguridad Doble Paleta', descripcion: 'Cerradura embutir frente de acero inoxidable', precio: 24500, stockActual: 3, stockMinimo: 5, categoria: 'Cerrajería' },
        { id: 13, codigo: 'SEG-001', nombre: 'Guantes Moteados Algodón', descripcion: 'Par de guantes de trabajo antideslizantes', precio: 1800, stockActual: 40, stockMinimo: 15, categoria: 'Seguridad Industrial' },
        { id: 14, codigo: 'CON-001', nombre: 'Adhesivo Cerámico Impermeable 25kg', descripcion: 'Pegamento cementicio para pisos y revestimientos', precio: 9400, stockActual: 14, stockMinimo: 10, categoria: 'Construcción' },
        { id: 15, codigo: 'TAR-001', nombre: 'Tarugo Nylon N°8 con Tope (x100)', descripcion: 'Fijación universal para pared maciza y hueca', precio: 2100, stockActual: 50, stockMinimo: 15, categoria: 'Tornillería' },
        { id: 16, codigo: 'TER-001', nombre: 'Interruptor Termomagnético 2x16A', descripcion: 'Térmica bipolar riel DIN curva C', precio: 8900, stockActual: 7, stockMinimo: 8, categoria: 'Electricidad' },
    ];

    async obtenerTodos(query?: ProductoQueryOptions): Promise<PaginatedResult<Producto>> {
        let lista = this.productos;

        if (query?.categoria) {
            lista = lista.filter((p) => p.categoria.toLowerCase() === query.categoria!.toLowerCase());
        }

        if (query?.bajoStock === 'true') {
            lista = lista.filter((p) => p.stockActual <= p.stockMinimo);
        }

        return paginateAndFilter(lista, query || {}, ['codigo', 'nombre', 'descripcion', 'categoria']);
    }

    async listarSinPaginar(): Promise<Producto[]> {
        return this.productos;
    }

    async obtenerPorId(id: number): Promise<Producto | undefined> {
        return this.productos.find((producto) => producto.id === id);
    }

    async crear(datos: Omit<Producto, 'id'>): Promise<Producto> {
        const nextId = this.productos.length > 0
            ? Math.max(...this.productos.map((p) => p.id)) + 1
            : 1;
        const nuevo: Producto = { id: nextId, ...datos };
            this.productos.push(nuevo);
        return nuevo;
    }

    async actualizar(id: number, datosActualizados: Partial<Producto>): Promise<Producto | undefined> {
        const indice = this.productos.findIndex((producto) => producto.id === id);
        if (indice === -1) return undefined;

            this.productos[indice] = {
            ...this.productos[indice],
            ...datosActualizados,
            id,
        };
        return this.productos[indice];
    }

    async eliminar(id: number): Promise<Producto | undefined> {
        const indice = this.productos.findIndex((producto) => producto.id === id);
        if (indice === -1) return undefined;
        return this.productos.splice(indice, 1)[0];
    }
}

export default new ProductoRepository();