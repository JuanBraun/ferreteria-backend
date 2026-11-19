import { Router } from 'express';
import proveedorController from '../controllers/proveedorController';

const router = Router();

router.get('/', (req, res) => {
    return proveedorController.listar(req, res);
});

router.get('/:id', (req, res) => {
    return proveedorController.obtenerPorId(req, res);
});

router.post('/', (req, res) => {
    return proveedorController.crear(req, res);
});

router.put('/:id', (req, res) => {
    return proveedorController.actualizar(req, res);
});

router.delete('/:id', (req, res) => {
    return proveedorController.eliminar(req, res);
});

export default router;