import { Proveedor } from '../models/proveedor';
import proveedorRepository from '../repositories/ProveedorRepository';
import AppError from '../utils/appError';

class ProveedorService {

    async listar(): Promise<Proveedor[]> {
        return await proveedorRepository.obtenerTodos();
    }

    async obtenerPorId(id: number): Promise<Proveedor | undefined> {
        return await proveedorRepository.obtenerPorId(id);
    }

    async crear(datos: Omit<Proveedor, 'id'>): Promise<Proveedor> {
        this.validarDatos(datos);

        const proveedores = await proveedorRepository.obtenerTodos();

        const nombreExiste = proveedores.some(
            proveedor =>
                proveedor.nombre.toLowerCase() === datos.nombre.trim().toLowerCase()
        );

        if (nombreExiste) {
            throw new AppError('Ya existe un proveedor con ese nombre');
        }

        const nuevoProveedor: Proveedor = {
            id: Date.now(),
            nombre: datos.nombre.trim(),
            contacto: datos.contacto?.trim(),
            telefono: datos.telefono?.trim(),
            email: datos.email?.trim(),
            direccion: datos.direccion?.trim()
        };

        return await proveedorRepository.crear(nuevoProveedor);
    }

    async actualizar(
        id: number,
        datos: Omit<Proveedor, 'id'>
    ): Promise<Proveedor | undefined> {
        this.validarDatos(datos);

        const proveedorExistente = await proveedorRepository.obtenerPorId(id);

        if (!proveedorExistente) {
            return undefined;
        }

        const proveedores = await proveedorRepository.obtenerTodos();

        const nombreExiste = proveedores.some(
            proveedor =>
                proveedor.nombre.toLowerCase() === datos.nombre.trim().toLowerCase()
                && proveedor.id !== id
        );

        if (nombreExiste) {
            throw new AppError('Ya existe otro proveedor con ese nombre');
        }

        const proveedorActualizado: Proveedor = {
            id,
            nombre: datos.nombre.trim(),
            contacto: datos.contacto?.trim(),
            telefono: datos.telefono?.trim(),
            email: datos.email?.trim(),
            direccion: datos.direccion?.trim()
        };

        return await proveedorRepository.actualizar(id, proveedorActualizado);
    }

    async eliminar(id: number): Promise<Proveedor | undefined> {
        return await proveedorRepository.eliminar(id);
    }

    private validarDatos(datos: Omit<Proveedor, 'id'>): void {
        if (!datos.nombre?.trim()) {
            throw new AppError('El nombre del proveedor es obligatorio');
        }

        const camposTexto = [
            datos.contacto,
            datos.telefono,
            datos.email,
            datos.direccion
        ];

        if (camposTexto.some(campo => campo !== undefined && typeof campo !== 'string')) {
            throw new AppError('Los datos de contacto deben ser textos');
        }

        if (
            datos.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())
        ) {
            throw new AppError('El formato del email no es válido');
        }
    }
}

export default new ProveedorService();