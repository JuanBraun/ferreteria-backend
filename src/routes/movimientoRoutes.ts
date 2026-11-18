
import { Router } from 'express';
import movimientoController from '../controllers/movimientoController';

const router = Router();

router.get('/', movimientoController.listar);
router.get('/producto/:productoId', movimientoController.listarPorProducto);
router.get('/:id', movimientoController.obtenerPorId);
router.post('/', movimientoController.crear);

export default router;
