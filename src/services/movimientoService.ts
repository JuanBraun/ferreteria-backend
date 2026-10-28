import * as movimientoRepository from "../repositories/movimientoRepository";
import * as productoService from "./productoService";
import { notificarAlertaStock } from "./observers/stockAlertObserver";

export const registrarMovimiento = async (datos: any) => {
    const { producto_id, tipo, cantidad, motivo } = datos;
    const cant = Number(cantidad);
    
    if (isNaN(cant) || cant <= 0) {
        const error: any = new Error("La cantidad debe ser un número mayor a cero");
        error.status = 400;
        throw error;
    }

    const producto = await productoService.obtenerProducto(producto_id);
    let nuevoStock = Number(producto.stock_actual);

    if (tipo === "INGRESO") {
        nuevoStock += cant;
    } else if (tipo === "EGRESO") {
        if (nuevoStock - cant < 0) {
            const error: any = new Error(`Stock insuficiente. Stock actual: ${nuevoStock}`);
            error.status = 400;
            throw error;
        }
        nuevoStock -= cant;
    } else {
        const error: any = new Error("El tipo de movimiento debe ser 'INGRESO' o 'EGRESO'");
        error.status = 400;
        throw error;
    }

    // Delegamos al repositorio la tarea de simular (mockear) la actualización
    const movimiento = await movimientoRepository.registrar({ producto_id, tipo, cantidad: cant, motivo });
    
    const productoActualizado = { ...producto, stock_actual: nuevoStock };
    notificarAlertaStock(productoActualizado);

    return { movimiento, nuevo_stock: nuevoStock };
};

export const obtenerHistorial = async (producto_id: string | number) => {
    await productoService.obtenerProducto(producto_id);
    return await movimientoRepository.obtenerPorProductoId(producto_id);
};