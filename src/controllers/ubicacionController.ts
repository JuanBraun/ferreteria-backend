import { Request, Response, NextFunction } from "express";
import * as ubicacionService from "../services/ubicacionService";

export const getUbicaciones = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ubicaciones = await ubicacionService.listarUbicaciones();
    res.status(200).json({ msg: "Ok", code: 200, data: ubicaciones });
  } catch (error) {
    next(error);
  }
};

export const createUbicacion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevaUbicacion = await ubicacionService.crearUbicacion(req.body);
    res.status(201).json({ msg: "Creado", code: 201, data: nuevaUbicacion });
  } catch (error) {
    next(error);
  }
};