
import { Router } from 'express';
import productoController from '../controllers/productoController';

const router = Router();

router.get('/', (req, res) => {
    return productoController.listar(req, res);
});

router.get('/:id', (req, res) => {
    return productoController.obtenerPorId(req, res);
});

router.post('/', (req, res) => {
    return productoController.crear(req, res);
});

router.put('/:id', (req, res) => {
    return productoController.actualizar(req, res);
});

router.delete('/:id', (req, res) => {
    return productoController.eliminar(req, res);
});

export default router;