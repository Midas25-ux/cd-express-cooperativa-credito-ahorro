// src/routes/cuentas.routes.ts — Definición de rutas del recurso
import { Router } from 'express';
import * as ctrl from '../controllers/cuentas.controller';

const router = Router();

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
