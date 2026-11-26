import { Categoria } from '../models/categoria';
import { paginateAndFilter, QueryOptions, PaginatedResult } from '../utils/pagination';

class CategoriaRepository {
    private categorias: Categoria[] = [
    { id: 1, nombre: 'Tornillería', descripcion: 'Tornillos, tuercas, arandelas, tarugos y fijaciones' },
    { id: 2, nombre: 'Herramientas Manuales', descripcion: 'Martillos, destornilladores, pinzas, llaves y sierras' },
    { id: 3, nombre: 'Herramientas Eléctricas', descripcion: 'Taladros, amoladoras, lijadoras y caladoras' },
    { id: 4, nombre: 'Pinturería', descripcion: 'Látex, esmaltes sintéticos, rodillos, pinceles y diluyentes' },
    { id: 5, nombre: 'Electricidad', descripcion: 'Cables, térmicas, disyuntores, cajas y luminaria' },
    { id: 6, nombre: 'Plomería', descripcion: 'Caños termofusión, llaves de paso, grifería y flexibles' },
    { id: 7, nombre: 'Construcción', descripcion: 'Cemento, cal, adhesivos cerámicos e impermeabilizantes' },
    { id: 8, nombre: 'Cerrajería', descripcion: 'Cerraduras, candados, bisagras, picaportes y pasadores' },
    { id: 9, nombre: 'Medición y Nivelación', descripcion: 'Cintas métricas, niveles láser, escuadras y calibres' },
    { id: 10, nombre: 'Seguridad Industrial', descripcion: 'Guantes, antiparras, cascos, calzado y protección auditiva' },
    { id: 11, nombre: 'Adhesivos y Selladores', descripcion: 'Siliconas, selladores poliuretánicos y pegamentos' },
    { id: 12, nombre: 'Abrasivos y Corte', descripcion: 'Discos de corte, lijas, mechas y fresas' },
    { id: 13, nombre: 'Jardinería', descripcion: 'Mangueras, picos de riego, tijeras de podar y palas' },
    { id: 14, nombre: 'Gas y Calefacción', descripcion: 'Caños epoxi, reguladores, válvulas y sellarroscas' },
    { id: 15, nombre: 'Bulonería Pesada', descripcion: 'Varillas roscadas, anclajes químicos y bulones hexagonales' },
    ];

async obtenerTodos(query?: QueryOptions): Promise<PaginatedResult<Categoria>> {
    return paginateAndFilter(this.categorias, query || {}, ['nombre', 'descripcion']);
}

    async listarSinPaginar(): Promise<Categoria[]> {
        return this.categorias;
    }

    async obtenerPorId(id: number): Promise<Categoria | undefined> {
        return this.categorias.find((categoria) => categoria.id === id);
    }

    async crear(datos: Omit<Categoria, 'id'>): Promise<Categoria> {
        const nextId = this.categorias.length > 0
            ? Math.max(...this.categorias.map((c) => c.id)) + 1
            : 1;
        const nueva: Categoria = { id: nextId, ...datos };
            this.categorias.push(nueva);
        return nueva;
    }

    async actualizar(id: number, datosActualizados: Partial<Categoria>): Promise<Categoria | undefined> {
        const indice = this.categorias.findIndex((categoria) => categoria.id === id);
    if (indice === -1) return undefined;

    this.categorias[indice] = {
        ...this.categorias[indice],
        ...datosActualizados,
        id,
    };
    return this.categorias[indice];
    }

    async eliminar(id: number): Promise<Categoria | undefined> {
    const indice = this.categorias.findIndex((categoria) => categoria.id === id);
    if (indice === -1) return undefined;
    return this.categorias.splice(indice, 1)[0];
    }
}

export default new CategoriaRepository();