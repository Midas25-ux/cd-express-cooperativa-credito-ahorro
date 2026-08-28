// ============================================
// ROUTES — Mapeo de URLs a controllers
// ============================================
// Esta capa no contiene lógica de negocio.

import { Router } from 'express';

import * as controller from '../controllers/cuentas.controller';

export const cuentasRouter = Router();

// GET /api/v1/cuentas
cuentasRouter.get('/', controller.getAll);

// GET /api/v1/cuentas/:id
cuentasRouter.get('/:id', controller.getById);

// POST /api/v1/cuentas
cuentasRouter.post('/', controller.create);

// PUT /api/v1/cuentas/:id
cuentasRouter.put('/:id', controller.update);

// DELETE /api/v1/cuentas/:id
cuentasRouter.delete('/:id', controller.remove);