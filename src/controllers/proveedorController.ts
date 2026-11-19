import { Request, Response } from 'express';
import proveedorService from '../services/proveedorService';
import AppError from '../utils/appError';

class ProveedorController {

    private obtenerId(valor: string | string[]): number {
        if (typeof valor !== 'string') {
            throw new AppError('El ID debe ser un número entero positivo');
        }

        const id = Number(valor);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError('El ID debe ser un número entero positivo');
        }

        return id;
    }

    async listar(req: Request, res: Response): Promise<void> {
        const proveedores = await proveedorService.listar();

        res.status(200).json({
            mensaje: 'Proveedores obtenidos correctamente',
            datos: proveedores
        });
    }

    async obtenerPorId(req: Request, res: Response): Promise<void> {
        const id = this.obtenerId(req.params.id);
        const proveedor = await proveedorService.obtenerPorId(id);

        if (!proveedor) {
            throw new AppError('Proveedor no encontrado', 404);
        }

        res.status(200).json({
            mensaje: 'Proveedor obtenido correctamente',
            datos: proveedor
        });
    }

    async crear(req: Request, res: Response): Promise<void> {
        const datosProveedor = {
            nombre: req.body.nombre,
            contacto: req.body.contacto,
            telefono: req.body.telefono,
            email: req.body.email,
            direccion: req.body.direccion
        };

        const proveedorCreado = await proveedorService.crear(datosProveedor);

        res.status(201).json({
            mensaje: 'Proveedor creado correctamente',
            datos: proveedorCreado
        });
    }

    async actualizar(req: Request, res: Response): Promise<void> {
        const id = this.obtenerId(req.params.id);

        const datosActualizados = {
            nombre: req.body.nombre,
            contacto: req.body.contacto,
            telefono: req.body.telefono,
            email: req.body.email,
            direccion: req.body.direccion
        };

        const proveedorActualizado = await proveedorService.actualizar(
            id,
            datosActualizados
        );

        if (!proveedorActualizado) {
            throw new AppError('Proveedor no encontrado', 404);
        }

        res.status(200).json({
            mensaje: 'Proveedor actualizado correctamente',
            datos: proveedorActualizado
        });
    }

    async eliminar(req: Request, res: Response): Promise<void> {
        const id = this.obtenerId(req.params.id);
        const proveedorEliminado = await proveedorService.eliminar(id);

        if (!proveedorEliminado) {
            throw new AppError('Proveedor no encontrado', 404);
        }

        res.status(200).json({
            mensaje: 'Proveedor eliminado correctamente',
            datos: proveedorEliminado
        });
    }
}

export default new ProveedorController();