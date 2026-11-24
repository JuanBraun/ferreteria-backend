import { Producto } from '../models/producto';

interface OpcionesListado {
    page: number;
    limit: number;
    sortBy: keyof Producto;
    order: 'asc' | 'desc';
    nombre?: string;
    codigo?: string;
    categoria?: string;
}

class ProductoRepository {
    private productos: Producto[] = [
        {
            id: 1,
            codigo: 'TOR-001',
            nombre: 'Tornillo Phillips 1"',
            descripcion: 'Tornillo autoperforante para madera (caja x 100u)',
            precio: 150,
            stockActual: 100,
            stockMinimo: 20,
            categoria: 'Tornillería'
        },
        {
            id: 2,
            codigo: 'MAR-001',
            nombre: 'Martillo Galponero',
            descripcion: 'Martillo de acero forjado con mango de fibra',
            precio: 8500,
            stockActual: 8,
            stockMinimo: 10,
            categoria: 'Herramientas'
        },
        {
            id: 3,
            codigo: 'PIN-001',
            nombre: 'Pintura Látex Interior 4L',
            descripcion: 'Látex blanco mate lavable',
            precio: 18500,
            stockActual: 24,
            stockMinimo: 6,
            categoria: 'Pinturería'
        },
        {
            id: 4,
            codigo: 'TAL-001',
            nombre: 'Taladro Percutor 650W',
            descripcion: 'Taladro eléctrico velocidad variable 13mm',
            precio: 64000,
            stockActual: 5,
            stockMinimo: 3,
            categoria: 'Herramientas Eléctricas'
        },
        {
            id: 5,
            codigo: 'CIN-001',
            nombre: 'Cinta Métrica 5m',
            descripcion: 'Cinta métrica metálica con freno y clip',
            precio: 4200,
            stockActual: 30,
            stockMinimo: 10,
            categoria: 'Medición'
        },
        {
            id: 6,
            codigo: 'LLA-001',
            nombre: 'Llave Francesa 10"',
            descripcion: 'Llave ajustable de acero cromo vanadio',
            precio: 11200,
            stockActual: 4,
            stockMinimo: 8,
            categoria: 'Herramientas'
        },
        {
            id: 7,
            codigo: 'CAB-001',
            nombre: 'Cable Unipolar 2.5mm (Rollo 100m)',
            descripcion: 'Cable eléctrico normalizado color celeste',
            precio: 45000,
            stockActual: 12,
            stockMinimo: 4,
            categoria: 'Electricidad'
        },
        {
            id: 8,
            codigo: 'ADH-001',
            nombre: 'Adhesivo de Contacto 250ml',
            descripcion: 'Pegamento multiuso de secado rápido',
            precio: 3800,
            stockActual: 18,
            stockMinimo: 5,
            categoria: 'Adhesivos y Selladores'
        }
    ];

    async obtenerTodos(): Promise<Producto[]> {
        return this.productos;
    }

    async listarConOpciones(opciones: OpcionesListado): Promise<{
        productos: Producto[];
        total: number;
    }> {
        let resultados = [...this.productos];

        if (opciones.nombre) {
            resultados = resultados.filter(producto =>
                producto.nombre
                    .toLowerCase()
                    .includes(opciones.nombre!.toLowerCase())
            );
        }

        if (opciones.codigo) {
            resultados = resultados.filter(producto =>
                producto.codigo
                    .toLowerCase()
                    .includes(opciones.codigo!.toLowerCase())
            );
        }

        if (opciones.categoria) {
            resultados = resultados.filter(producto =>
                producto.categoria
                    .toLowerCase()
                    .includes(opciones.categoria!.toLowerCase())
            );
        }

        const total = resultados.length;

        resultados.sort((a, b) => {
            const valorA = a[opciones.sortBy];
            const valorB = b[opciones.sortBy];

            if (valorA < valorB) {
                return opciones.order === 'asc' ? -1 : 1;
            }

            if (valorA > valorB) {
                return opciones.order === 'asc' ? 1 : -1;
            }

            return 0;
        });

        const inicio = (opciones.page - 1) * opciones.limit;
        const fin = inicio + opciones.limit;

        resultados = resultados.slice(inicio, fin);

        return {
            productos: resultados,
            total
        };
    }

    async obtenerPorId(id: number): Promise<Producto | undefined> {
        return this.productos.find(producto => producto.id === id);
    }

    async crear(producto: Producto): Promise<Producto> {
        this.productos.push(producto);
        return producto;
    }

    async actualizar(
        id: number,
        datosActualizados: Producto
    ): Promise<Producto | undefined> {
        const indice = this.productos.findIndex(
            producto => producto.id === id
        );

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
        const indice = this.productos.findIndex(
            producto => producto.id === id
        );

        if (indice === -1) {
            return undefined;
        }

        const [productoEliminado] = this.productos.splice(indice, 1);

        return productoEliminado;
    }
}

export default new ProductoRepository();