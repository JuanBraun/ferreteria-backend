import * as productoRepository from "../repositories/productRepository";
import { validarStockInicial } from "./stockValidator";
import { notificarAlertaStock } from "./observers/stockAlertObserver";
import * as ubicacionService from "./ubicacionService";

export const listarProductos = async (query: any) => {
    return await productoRepository.obtenerTodos(query);
};

export const obtenerProducto = async (id: string | number) => {
    const producto = await productoRepository.obtenerPorId(id);
    if (!producto) {
        const error: any = new Error("Producto no encontrado");
        error.status = 404;
        throw error;
    }
    return producto;
};

export const crearProducto = async (datosProducto: any) => {
    let ubicacionId = datosProducto.ubicacion_id || null;

    if (datosProducto.pasillo && datosProducto.estante && datosProducto.nivel) {
        const nuevaUbicacion = await ubicacionService.crearUbicacion({
            pasillo: datosProducto.pasillo,
            estante: datosProducto.estante,
            nivel: datosProducto.nivel,
            descripcion: datosProducto.descripcion_ubicacion || ""
        });
        ubicacionId = nuevaUbicacion.id;
    }

    const productoNormalizado = {
        ...datosProducto,
        stock_max: datosProducto.stock_maximo || datosProducto.stock_max,
        ubicacion_id: ubicacionId
    };

    validarStockInicial(productoNormalizado);
    const nuevoProducto = await productoRepository.crear(productoNormalizado);
    notificarAlertaStock(nuevoProducto);
    return nuevoProducto;
};

export const actualizarProducto = async (id: string | number, datosProducto: any) => {
    await obtenerProducto(id);

    let ubicacionId = datosProducto.ubicacion_id || null;
    if (datosProducto.pasillo && datosProducto.estante && datosProducto.nivel) {
        const nuevaUbicacion = await ubicacionService.crearUbicacion({
            pasillo: datosProducto.pasillo,
            estante: datosProducto.estante,
            nivel: datosProducto.nivel,
            descripcion: datosProducto.descripcion_ubicacion || ""
        });
        ubicacionId = nuevaUbicacion.id;
    }

    const productoNormalizado = {
        ...datosProducto,
        stock_max: datosProducto.stock_maximo || datosProducto.stock_max,
        ubicacion_id: ubicacionId
    };

    validarStockInicial(productoNormalizado);
    const productoActualizado = await productoRepository.actualizar(id, productoNormalizado);
    notificarAlertaStock(productoActualizado);
    return productoActualizado;
};

export const eliminarProducto = async (id: string | number) => {
    await obtenerProducto(id);
    return await productoRepository.eliminar(id);
};