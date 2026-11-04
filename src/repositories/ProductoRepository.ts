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