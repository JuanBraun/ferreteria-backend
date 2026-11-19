
import { Router } from 'express';
import movimientoController from '../controllers/movimientoController';

const router = Router();

router.get('/', movimientoController.listar);
router.get('/producto/:productoId', movimientoController.listarPorProducto);
router.get('/:id', movimientoController.obtenerPorId);
router.post('/', movimientoController.crear);
router.patch('/:id', movimientoController.actualizar);
router.delete('/:id', movimientoController.eliminar);

export default router;
