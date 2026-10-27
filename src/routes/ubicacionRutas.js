const express = require("express");
const router = express.Router();
const ubicacionController = require("../controllers/ubicacionController");

router.get("/", ubicacionController.getUbicaciones);
router.post("/", ubicacionController.createUbicacion);

module.exports = router;
