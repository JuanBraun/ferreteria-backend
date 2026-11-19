import { Router } from 'express';
import proveedorController from '../controllers/proveedorController';

const router = Router();

router.get('/', proveedorController.listar);
router.get('/:id', proveedorController.obtenerPorId);
router.post('/', proveedorController.crear);
router.patch('/:id', proveedorController.actualizar);
router.delete('/:id', proveedorController.eliminar);

export default router;