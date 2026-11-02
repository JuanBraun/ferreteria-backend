const express = require("express");
const router = express.Router();
const movimientoController = require("../controllers/movimientoController");

router.post("/", movimientoController.registrar);
router.get("/producto/:productoId", movimientoController.obtenerHistorial);

module.exports = router;
