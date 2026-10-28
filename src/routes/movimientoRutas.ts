import { Router } from "express";
import * as movimientoController from "../controllers/movimientoController";

const router = Router();

router.post("/", movimientoController.registrar);
router.get("/producto/:productoId", movimientoController.obtenerHistorial);

export default router;