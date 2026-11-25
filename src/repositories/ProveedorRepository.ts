import { Proveedor } from '../models/proveedor';
import { paginateAndFilter, QueryOptions, PaginatedResult } from '../utils/pagination';

class ProveedorRepository {
    private proveedores: Proveedor[] = [
        { id: 1, nombre: 'Ferretería Industrial SA', contacto: 'Carlos Pérez', telefono: '2914567890', email: 'contacto@ferreteriaindustrial.com', direccion: 'Av. Colón 1234' },
        { id: 2, nombre: 'Distribuidora del Sur', contacto: 'María González', telefono: '2914123456', email: 'ventas@distribuidoradelsur.com', direccion: 'Brown 567' },
        { id: 3, nombre: 'Materiales Bahía', contacto: 'Jorge Gómez', telefono: '2914987654', email: 'info@materialesbahia.com.ar', direccion: 'Sarmiento 890' },
        { id: 4, nombre: 'Bulonera Patagónica', contacto: 'Lucía Fernández', telefono: '2914223344', email: 'pedidos@bulonerapatagonica.com', direccion: 'Donado 412' },
        { id: 5, nombre: 'Herramientas Eléctricas Argentinas', contacto: 'Martín Silva', telefono: '1156781234', email: 'msilva@herramientasarg.com', direccion: 'Av. Warnes 1520' },
        { id: 6, nombre: 'Pinturerías del Centro Mayorista', contacto: 'Sofía Martínez', telefono: '2914778899', email: 'mayorista@pintureriascentro.com', direccion: 'Alsina 310' },
        { id: 7, nombre: 'Sanitarios y Grifería del Puerto', contacto: 'Roberto Díaz', telefono: '2914332211', email: 'ventas@sanitariospuerto.com', direccion: 'Av. Cerri 780' },
        { id: 8, nombre: 'Cables y Electricidad Bahiense', contacto: 'Ana Torres', telefono: '2914665544', email: 'atorres@cablesbahiense.com.ar', direccion: 'Estomba 645' },
        { id: 9, nombre: 'Abrasivos y Soldaduras Sur', contacto: 'Diego Morales', telefono: '2914119988', email: 'dmorales@abrasivossur.com', direccion: 'Ruta 3 Sur Km 695' },
        { id: 10, nombre: 'Cerraduras y Herrajes Modernos', contacto: 'Valeria Ruiz', telefono: '1149876543', email: 'contacto@herrajesmodernos.com', direccion: 'Av. San Martín 2100' },
        { id: 11, nombre: 'Adhesivos y Selladores Industriales', contacto: 'Fernando Castro', telefono: '2914550011', email: 'fcastro@adhesivosind.com', direccion: 'Vieytes 1120' },
        { id: 12, nombre: 'Escaleras y Andamios del Atlántico', contacto: 'Paula Romero', telefono: '2234889900', email: 'ventas@andamiosatlantico.com', direccion: 'Av. Champagnat 950' },
        { id: 13, nombre: 'Plomería y Gas Integral', contacto: 'Héctor Sosa', telefono: '2914887766', email: 'hsosa@plomeriaintegral.com.ar', direccion: 'Chiclana 530' },
        { id: 14, nombre: 'Seguridad Industrial y EPP', contacto: 'Camila Vega', telefono: '2914990022', email: 'cvega@seguridadepp.com', direccion: 'O’Higgins 285' }
    ];

    async obtenerTodos(query: QueryOptions): Promise<PaginatedResult<Proveedor>> {
        return paginateAndFilter(this.proveedores, query, ['nombre', 'contacto', 'email', 'direccion']);
    }

    async obtenerTodosSinPaginar(): Promise<Proveedor[]> {
        return this.proveedores;
    }

    async obtenerPorId(id: number): Promise<Proveedor | undefined> {
        return this.proveedores.find((proveedor) => proveedor.id === id);
    }

    async crear(proveedor: Proveedor): Promise<Proveedor> {
        this.proveedores.push(proveedor);
        return proveedor;
    }

    async actualizar(id: number, datos: Partial<Proveedor>): Promise<Proveedor | undefined> {
        const index = this.proveedores.findIndex((proveedor) => proveedor.id === id);
        if (index === -1) return undefined;

        this.proveedores[index] = {
            ...this.proveedores[index],
            ...datos,
            id
        };

        return this.proveedores[index];
    }

    async eliminar(id: number): Promise<boolean> {
        const index = this.proveedores.findIndex((proveedor) => proveedor.id === id);
        if (index === -1) return false;

        this.proveedores.splice(index, 1);
        return true;
    }
}

export default new ProveedorRepository();