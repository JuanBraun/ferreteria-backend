
import { Router } from 'express';
import productoController from '../controllers/productoController';

const router = Router();

router.get('/', (req, res) => {
    productoController.listar(req, res);
});

router.get('/:id', (req, res) => {
    productoController.obtenerPorId(req, res);
});

export default router;
