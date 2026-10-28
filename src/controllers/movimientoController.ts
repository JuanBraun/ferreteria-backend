import { Request, Response, NextFunction } from "express";
import * as movimientoService from "../services/movimientoService";

export const registrar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resultado = await movimientoService.registrarMovimiento(req.body);
    res.status(201).json({ msg: "Registrado", code: 201, data: resultado });
  } catch (error) {
    next(error);
  }
};

export const obtenerHistorial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const historial = await movimientoService.obtenerHistorial(String(req.params.productoId));
    res.status(200).json({ msg: "Ok", code: 200, data: historial });
  } catch (error) {
    next(error);
  }
};