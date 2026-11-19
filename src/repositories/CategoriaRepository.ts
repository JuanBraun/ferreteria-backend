import { Categoria } from '../models/categoria';

class CategoriaRepository {
    private categorias: Categoria[] = [
        {
            id: 1,
            nombre: 'Tornillería',
            descripcion: 'Tornillos, tuercas, arandelas y elementos de fijación'
        },
        {
            id: 2,
            nombre: 'Herramientas',
            descripcion: 'Herramientas manuales y eléctricas'
        },
        {
            id: 3,
            nombre: 'Pinturería',
            descripcion: 'Pinturas, pinceles y accesorios'
        }
    ];

    async obtenerTodos(): Promise<Categoria[]> {
        return this.categorias;
    }

    async obtenerPorId(id: number): Promise<Categoria | undefined> {
        return this.categorias.find(categoria => categoria.id === id);
    }

    async crear(categoria: Categoria): Promise<Categoria> {
        this.categorias.push(categoria);
        return categoria;
    }

    async actualizar(
        id: number,
        datosActualizados: Categoria
    ): Promise<Categoria | undefined> {
        const indice = this.categorias.findIndex(
            categoria => categoria.id === id
        );

        if (indice === -1) {
            return undefined;
        }

        this.categorias[indice] = {
            ...datosActualizados,
            id
        };

        return this.categorias[indice];
    }

    async eliminar(id: number): Promise<Categoria | undefined> {
        const indice = this.categorias.findIndex(
            categoria => categoria.id === id
        );

        if (indice === -1) {
            return undefined;
        }

        return this.categorias.splice(indice, 1)[0];
    }
}

export default new CategoriaRepository();