import { Router } from 'express';
import inventarioController from '../controllers/inventarioController';

const router = Router();

// Consultar todo el inventario
router.get('/', (req, res) => {
    return inventarioController.listarStock(req, res);
});

// Consultar productos con stock bajo
router.get('/stock-bajo', (req, res) => {
    return inventarioController.listarStockBajo(req, res);
});

// Consultar disponibilidad de un producto
router.get('/disponibilidad/:id', (req, res) => {
    return inventarioController.consultarDisponibilidad(req, res);
});

export default router;