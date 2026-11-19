import { Router } from 'express';
import categoriaController from '../controllers/categoriaController';

const router = Router();

router.get('/', (req, res) => {
    return categoriaController.listar(req, res);
});

router.get('/:id', (req, res) => {
    return categoriaController.obtenerPorId(req, res);
});

router.post('/', (req, res) => {
    return categoriaController.crear(req, res);
});

router.put('/:id', (req, res) => {
    return categoriaController.actualizar(req, res);
});

router.delete('/:id', (req, res) => {
    return categoriaController.eliminar(req, res);
});

export default router;