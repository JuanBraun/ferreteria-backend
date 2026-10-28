import { Router } from "express";
import * as categoriaController from "../controllers/categoriaController";

const router = Router();

router.get("/", categoriaController.getCategorias);
router.post("/", categoriaController.createCategoria);

export default router;