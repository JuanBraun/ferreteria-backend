import { Request, Response, NextFunction } from "express";
import * as productoService from "../services/productoService";

export const getProductos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productos = await productoService.listarProductos(req.query);
    res.status(200).json({ msg: "Ok", code: 200, data: productos });
  } catch (error) {
    next(error);
  }
};

export const getProductoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const producto = await productoService.obtenerProducto(String(req.params.id));
    res.status(200).json({ msg: "Ok", code: 200, data: producto });
  } catch (error) {
    next(error);
  }
};

export const createProducto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const nuevoProducto = await productoService.crearProducto(req.body);
    res.status(201).json({ msg: "Creado", code: 201, data: nuevoProducto });
  } catch (error) {
    next(error);
  }
};

export const updateProducto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productoActualizado = await productoService.actualizarProducto(String(req.params.id), req.body);
    res.status(200).json({ msg: "Actualizado", code: 200, data: productoActualizado });
  } catch (error) {
    next(error);
  }
};

export const deleteProducto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await productoService.eliminarProducto(String(req.params.id));
    res.status(200).json({ msg: "Eliminado", code: 200, data: null });
  } catch (error) {
    next(error);
  }
};