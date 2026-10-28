import { Request, Response, NextFunction } from "express";
import * as categoriaService from "../services/categoriaService";

export const getCategorias = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categorias = await categoriaService.listarCategorias();
    res.status(200).json({ msg: "Ok", code: 200, data: categorias });
  } catch (error) {
    next(error);
  }
};

export const createCategoria = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevaCategoria = await categoriaService.crearCategoria(req.body);
    res.status(201).json({ msg: "Creado", code: 201, data: nuevaCategoria });
  } catch (error) {
    next(error);
  }
};