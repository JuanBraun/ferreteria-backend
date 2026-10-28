import { Router } from 'express';
import * as productoController from '../controllers/productoController';

const router = Router();

router.get('/', productoController.getProductos);
router.get('/:id', productoController.getProductoById);
router.post('/', productoController.createProducto);
router.put('/:id', productoController.updateProducto);
router.delete('/:id', productoController.deleteProducto);

export default router;