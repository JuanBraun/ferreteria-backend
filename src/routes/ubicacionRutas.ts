import { Router } from "express";
import * as ubicacionController from "../controllers/ubicacionController";

const router = Router();

router.get("/", ubicacionController.getUbicaciones);
router.post("/", ubicacionController.createUbicacion);

export default router;