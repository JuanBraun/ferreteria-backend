import { Proveedor } from '../models/proveedor';

class ProveedorRepository {
    private proveedores: Proveedor[] = [
        {
            id: 1,
            nombre: 'Ferretería Industrial SA',
            contacto: 'Carlos Pérez',
            telefono: '2914567890',
            email: 'contacto@ferreteriaindustrial.com',
            direccion: 'Av. Colón 1234'
        },
        {
            id: 2,
            nombre: 'Distribuidora del Sur',
            contacto: 'María González',
            telefono: '2914123456',
            email: 'ventas@distribuidoradelsur.com',
            direccion: 'Brown 567'
        },
        {
            id: 3,
            nombre: 'Materiales Bahía',
            telefono: '2914987654',
            direccion: 'Sarmiento 890'
        }
    ];

    async obtenerTodos(): Promise<Proveedor[]> {
        return this.proveedores;
    }

    async obtenerPorId(id: number): Promise<Proveedor | undefined> {
        return this.proveedores.find(proveedor => proveedor.id === id);
    }

    async crear(proveedor: Proveedor): Promise<Proveedor> {
        this.proveedores.push(proveedor);
        return proveedor;
    }

    async actualizar(
        id: number,
        datosActualizados: Proveedor
    ): Promise<Proveedor | undefined> {
        const indice = this.proveedores.findIndex(
            proveedor => proveedor.id === id
        );

        if (indice === -1) {
            return undefined;
        }

        this.proveedores[indice] = {
            ...datosActualizados,
            id
        };

        return this.proveedores[indice];
    }

    async eliminar(id: number): Promise<Proveedor | undefined> {
        const indice = this.proveedores.findIndex(
            proveedor => proveedor.id === id
        );

        if (indice === -1) {
            return undefined;
        }

        return this.proveedores.splice(indice, 1)[0];
    }
}

export default new ProveedorRepository();